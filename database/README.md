# MetroMerge Database Documentation

## Overview
This document provides a comprehensive overview of the MetroMerge database structure, designed for a bus ticketing and vendor management platform.

## Database Schema Overview

### 🏗️ **Architecture**
- **Database Type**: MySQL 8.0+ / PostgreSQL 13+
- **Total Tables**: 25+ tables
- **Key Features**: UUID primary keys, comprehensive indexing, audit logging, analytics support

### 📊 **Core Modules**

#### 1. **User Management**
- `users` - Customer and admin user accounts
- `user_addresses` - Multiple addresses per user
- **Features**: Role-based access, email/phone verification, profile management

#### 2. **Vendor Management**
- `vendors` - Bus operator/vendor information
- `vendor_documents` - Document verification system
- **Features**: Business registration, document verification, commission tracking

#### 3. **Fleet Management**
- `buses` - Bus fleet information
- `bus_seat_layouts` - Configurable seat arrangements
- **Features**: Maintenance tracking, insurance management, performance metrics

#### 4. **Route & Schedule Management**
- `cities` - Master city data
- `routes` - Bus routes between cities
- `route_stops` - Intermediate stops
- `bus_schedules` - Time schedules for buses
- **Features**: Dynamic pricing, multi-stop routes, flexible scheduling

#### 5. **Booking System**
- `bookings` - Passenger bookings
- `payments` - Payment processing
- `refunds` - Refund management
- **Features**: Multi-seat booking, cancellation handling, payment gateway integration

#### 6. **Staff Management**
- `vendor_staff` - Driver, conductor, and other staff
- **Features**: License tracking, role management, bus assignment

#### 7. **Support System**
- `support_tickets` - Customer support tickets
- `support_ticket_messages` - Ticket conversation history
- **Features**: Priority management, assignment system, resolution tracking

#### 8. **Content Management**
- `faqs` - Frequently asked questions
- `banners` - Homepage promotional banners
- `system_settings` - Platform configuration
- **Features**: Content scheduling, category management

#### 9. **Communication**
- `notifications` - Multi-channel notifications
- `email_templates` - Email template management
- **Features**: Email/SMS/Push notifications, template variables

#### 10. **Reviews & Analytics**
- `reviews` - Customer reviews and ratings
- `daily_analytics` - Performance metrics
- `audit_logs` - Change tracking
- **Features**: Rating system, performance tracking, audit trail

## 🔑 **Key Design Principles**

### 1. **Scalability**
- UUID primary keys for distributed systems
- Proper indexing for performance
- Partitioning-ready design

### 2. **Data Integrity**
- Foreign key constraints
- Check constraints for data validation
- Comprehensive audit logging

### 3. **Flexibility**
- JSON fields for dynamic data
- Configurable seat layouts
- Extensible notification system

### 4. **Performance**
- Strategic indexing
- Materialized views for reporting
- Optimized queries for common operations

## 📈 **Analytics & Reporting**

### Daily Analytics
- Booking metrics (total, confirmed, cancelled)
- Revenue tracking
- User engagement metrics
- Performance indicators

### Business Intelligence
- Vendor performance comparison
- Route popularity analysis
- Revenue trends
- Customer satisfaction metrics

## 🔒 **Security Features**

### Data Protection
- Password hashing (implement bcrypt/argon2)
- Sensitive data encryption
- Audit logging for compliance

### Access Control
- Role-based permissions
- API rate limiting support
- Session management

## 🚀 **Performance Optimizations**

### Indexing Strategy
```sql
-- Composite indexes for common queries
CREATE INDEX idx_bookings_vendor_date ON bookings(vendor_id, travel_date);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, booking_status);
CREATE INDEX idx_schedules_route_time ON bus_schedules(route_id, departure_time);
```

### Query Optimization
- Materialized views for dashboard data
- Stored procedures for complex calculations
- Proper JOIN strategies

## 📋 **Common Queries**

### 1. **Vendor Dashboard Stats**
```sql
SELECT * FROM vendor_dashboard_stats WHERE vendor_id = ?;
```

### 2. **Popular Routes**
```sql
SELECT * FROM popular_routes LIMIT 10;
```

### 3. **Daily Revenue**
```sql
SELECT 
    DATE(created_at) as date,
    SUM(total_amount) as revenue,
    COUNT(*) as bookings
FROM bookings 
WHERE booking_status = 'confirmed'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

## 🔧 **Setup Instructions**

### 1. **Database Creation**
```sql
CREATE DATABASE metromerge CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. **Run Schema**
```bash
mysql -u username -p metromerge < database/schema.sql
```

### 3. **Environment Variables**
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=metromerge
DB_USER=your_username
DB_PASSWORD=your_password
```

## 📊 **Sample Data**

The schema includes sample data for:
- Major Indian cities
- System configuration settings
- Email templates
- Default user roles

## 🔄 **Migration Strategy**

### Version Control
- Use migration files for schema changes
- Maintain backward compatibility
- Document breaking changes

### Deployment
- Blue-green deployment support
- Rollback procedures
- Data migration scripts

## 🧪 **Testing**

### Test Data
- Comprehensive test fixtures
- Performance test scenarios
- Edge case validation

### Validation
- Data integrity checks
- Performance benchmarks
- Security testing

## 📚 **API Integration**

### ORM Compatibility
- Supports Prisma, TypeORM, Sequelize
- GraphQL schema generation
- REST API endpoints

### Real-time Features
- WebSocket support for live updates
- Event-driven architecture
- Notification queues

## 🔮 **Future Enhancements**

### Planned Features
- Multi-language support
- Advanced analytics
- Machine learning integration
- Mobile app optimization

### Scalability Roadmap
- Database sharding strategy
- Microservices architecture
- Cloud-native deployment

## 📞 **Support**

For database-related questions or issues:
- Review the schema documentation
- Check the sample queries
- Refer to the performance optimization guide

---

**Note**: This database schema is designed to be production-ready and scalable. Regular maintenance, monitoring, and optimization are recommended for optimal performance.
