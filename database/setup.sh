#!/bin/bash

# MetroMerge Database Setup Script
# This script sets up the complete database for the MetroMerge platform

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DB_NAME="metromerge"
DB_USER="metromerge_user"
DB_HOST="localhost"
DB_PORT="3306"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if MySQL is running
check_mysql() {
    print_status "Checking MySQL connection..."
    if ! command -v mysql &> /dev/null; then
        print_error "MySQL client not found. Please install MySQL."
        exit 1
    fi
    
    if ! mysql -h"$DB_HOST" -P"$DB_PORT" -u"root" -p -e "SELECT 1;" &> /dev/null; then
        print_error "Cannot connect to MySQL. Please check your MySQL installation and credentials."
        exit 1
    fi
    
    print_success "MySQL connection verified"
}

# Function to create database and user
create_database() {
    print_status "Creating database and user..."
    
    read -s -p "Enter MySQL root password: " ROOT_PASSWORD
    echo
    
    read -s -p "Enter password for new database user '$DB_USER': " DB_PASSWORD
    echo
    
    # Create database and user
    mysql -h"$DB_HOST" -P"$DB_PORT" -u"root" -p"$ROOT_PASSWORD" << EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$DB_USER'@'$DB_HOST' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'$DB_HOST';
FLUSH PRIVILEGES;
EOF
    
    print_success "Database '$DB_NAME' and user '$DB_USER' created successfully"
    
    # Save connection details to .env file
    cat > .env << EOF
# MetroMerge Database Configuration
DB_HOST=$DB_HOST
DB_PORT=$DB_PORT
DB_NAME=$DB_NAME
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD

# Application Configuration
NODE_ENV=development
JWT_SECRET=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -base64 32)

# Email Configuration (Update with your SMTP settings)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Payment Gateway (Update with your credentials)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760

# Redis (for caching and sessions)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Application URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
ADMIN_URL=http://localhost:3000/admin
EOF
    
    print_success "Environment configuration saved to .env file"
}

# Function to run schema
run_schema() {
    print_status "Running database schema..."
    
    if [ ! -f "database/schema.sql" ]; then
        print_error "Schema file not found: database/schema.sql"
        exit 1
    fi
    
    mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < database/schema.sql
    
    print_success "Database schema applied successfully"
}

# Function to run migrations
run_migrations() {
    print_status "Running database migrations..."
    
    if [ -d "database/migrations" ]; then
        for migration in database/migrations/*.sql; do
            if [ -f "$migration" ]; then
                print_status "Running migration: $(basename "$migration")"
                mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < "$migration"
            fi
        done
        print_success "All migrations completed"
    else
        print_warning "No migrations directory found"
    fi
}

# Function to seed sample data
seed_data() {
    print_status "Seeding sample data..."
    
    if [ -f "database/seeds.sql" ]; then
        mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < database/seeds.sql
        print_success "Sample data seeded successfully"
    else
        print_warning "No seed file found: database/seeds.sql"
    fi
}

# Function to verify installation
verify_installation() {
    print_status "Verifying database installation..."
    
    # Check if tables exist
    TABLE_COUNT=$(mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$DB_NAME';" -s -N)
    
    if [ "$TABLE_COUNT" -gt 0 ]; then
        print_success "Database setup completed successfully!"
        print_status "Tables created: $TABLE_COUNT"
        
        # Show table list
        echo
        print_status "Created tables:"
        mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -e "SHOW TABLES;" -s -N | while read table; do
            echo "  - $table"
        done
        
        echo
        print_status "Sample data counts:"
        mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" << EOF
SELECT 'Cities' as entity, COUNT(*) as count FROM cities
UNION ALL
SELECT 'System Settings' as entity, COUNT(*) as count FROM system_settings
UNION ALL
SELECT 'Email Templates' as entity, COUNT(*) as count FROM email_templates;
EOF
        
    else
        print_error "Database setup failed - no tables found"
        exit 1
    fi
}

# Function to show usage
show_usage() {
    echo "MetroMerge Database Setup Script"
    echo
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Options:"
    echo "  --full          Complete setup (create DB, run schema, migrations, seeds)"
    echo "  --schema-only   Run schema only"
    echo "  --migrate-only  Run migrations only"
    echo "  --seed-only     Run seeds only"
    echo "  --verify        Verify existing installation"
    echo "  --help          Show this help message"
    echo
    echo "Environment Variables:"
    echo "  DB_HOST         Database host (default: localhost)"
    echo "  DB_PORT         Database port (default: 3306)"
    echo "  DB_NAME         Database name (default: metromerge)"
    echo "  DB_USER         Database user (default: metromerge_user)"
    echo
}

# Main execution
main() {
    echo "=================================================="
    echo "       MetroMerge Database Setup Script"
    echo "=================================================="
    echo
    
    case "${1:-}" in
        --full)
            check_mysql
            create_database
            run_schema
            run_migrations
            seed_data
            verify_installation
            ;;
        --schema-only)
            check_mysql
            run_schema
            ;;
        --migrate-only)
            check_mysql
            run_migrations
            ;;
        --seed-only)
            check_mysql
            seed_data
            ;;
        --verify)
            check_mysql
            verify_installation
            ;;
        --help)
            show_usage
            ;;
        *)
            print_status "Starting full database setup..."
            check_mysql
            create_database
            run_schema
            run_migrations
            seed_data
            verify_installation
            
            echo
            print_success "🎉 MetroMerge database setup completed successfully!"
            echo
            print_status "Next steps:"
            echo "1. Update the .env file with your actual SMTP and payment gateway credentials"
            echo "2. Start your application server"
            echo "3. Access the admin panel at: http://localhost:3000/admin/login"
            echo "4. Use demo credentials: admin@metromerge.com / password"
            echo
            ;;
    esac
}

# Run main function with all arguments
main "$@"
