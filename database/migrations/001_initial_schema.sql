-- Migration: 001_initial_schema
-- Description: Initial database schema for MetroMerge platform
-- Created: 2024-01-27
-- Author: MetroMerge Development Team

-- Enable UUID extension (for PostgreSQL)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- MIGRATION UP
-- =====================================================

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    profile_image_url VARCHAR(500),
    role ENUM('user', 'admin', 'super_admin') DEFAULT 'user',
    status ENUM('active', 'inactive', 'suspended', 'deleted') DEFAULT 'active',
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_status (status),
    INDEX idx_role (role)
);

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name VARCHAR(255) NOT NULL,
    business_type ENUM('sole_proprietorship', 'partnership', 'private_limited', 'public_limited') NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    alternate_phone VARCHAR(20),
    
    -- Business Registration Details
    gst_number VARCHAR(50),
    pan_number VARCHAR(20),
    business_registration_number VARCHAR(100),
    
    -- Bank Details
    bank_account_number VARCHAR(50),
    bank_name VARCHAR(255),
    ifsc_code VARCHAR(20),
    account_holder_name VARCHAR(255),
    
    -- Address
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    
    -- Status and Verification
    status ENUM('pending', 'active', 'suspended', 'rejected', 'inactive') DEFAULT 'pending',
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    documents_verified BOOLEAN DEFAULT FALSE,
    
    -- Policies
    cancellation_policy TEXT,
    refund_policy TEXT,
    terms_and_conditions TEXT,
    
    -- Commission and Revenue
    commission_rate DECIMAL(5,2) DEFAULT 10.00,
    total_revenue DECIMAL(15,2) DEFAULT 0.00,
    total_bookings INT DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    approved_at TIMESTAMP,
    approved_by UUID,
    
    FOREIGN KEY (approved_by) REFERENCES users(id),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_verification_status (verification_status)
);

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_city_state (name, state),
    INDEX idx_name (name),
    INDEX idx_state (state)
);

-- Insert initial cities data (Pakistan)
INSERT INTO cities (name, state, country) VALUES
('Karachi', 'Sindh', 'Pakistan'),
('Hyderabad', 'Sindh', 'Pakistan'),
('Lahore', 'Punjab', 'Pakistan'),
('Islamabad', 'Islamabad Capital Territory', 'Pakistan'),
('Rawalpindi', 'Punjab', 'Pakistan'),
('Faisalabad', 'Punjab', 'Pakistan'),
('Multan', 'Punjab', 'Pakistan'),
('Peshawar', 'Khyber Pakhtunkhwa', 'Pakistan'),
('Quetta', 'Balochistan', 'Pakistan'),
('Umerkot', 'Sindh', 'Pakistan'),
('Mithi', 'Sindh', 'Pakistan'),
('Jamshoro', 'Sindh', 'Pakistan'),
('Dadu', 'Sindh', 'Pakistan'),
('Sukkur', 'Sindh', 'Pakistan'),
('Larkana', 'Sindh', 'Pakistan'),
('Gujranwala', 'Punjab', 'Pakistan'),
('Sialkot', 'Punjab', 'Pakistan'),
('Bahawalpur', 'Punjab', 'Pakistan'),
('Sargodha', 'Punjab', 'Pakistan'),
('Sheikhupura', 'Punjab', 'Pakistan');

-- Create system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_setting_key (setting_key),
    INDEX idx_is_public (is_public)
);

-- Insert initial system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('platform_commission_rate', '10.00', 'number', 'Default commission rate for vendors', FALSE),
('booking_cancellation_hours', '2', 'number', 'Hours before departure when cancellation is allowed', TRUE),
('max_seats_per_booking', '6', 'number', 'Maximum seats that can be booked in single transaction', TRUE),
('platform_name', 'MetroMerge', 'string', 'Platform name', TRUE),
('support_email', 'support@metromerge.com', 'string', 'Support email address', TRUE),
('support_phone', '+92-21-111-123-456', 'string', 'Support phone number', TRUE),
('platform_currency', 'PKR', 'string', 'Platform currency', TRUE),
('currency_symbol', 'Rs.', 'string', 'Currency symbol', TRUE),
('booking_advance_days', '60', 'number', 'Maximum days in advance booking is allowed', TRUE),
('refund_processing_days', '7', 'number', 'Number of days for refund processing', TRUE),
('platform_currency', 'INR', 'string', 'Platform currency', TRUE),
('maintenance_mode', 'false', 'boolean', 'Platform maintenance mode', FALSE);

-- Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name VARCHAR(100) UNIQUE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT,
    template_variables JSON,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_template_name (template_name),
    INDEX idx_is_active (is_active)
);

-- Insert initial email templates
INSERT INTO email_templates (template_name, subject, html_content, text_content, template_variables) VALUES
('booking_confirmation', 'Booking Confirmed - {{booking_reference}}', 
 '<h1>Booking Confirmed</h1><p>Dear {{passenger_name}},</p><p>Your booking {{booking_reference}} has been confirmed for {{route}} on {{travel_date}}.</p><p>Journey Details:</p><ul><li>Bus: {{bus_number}}</li><li>Seats: {{seat_numbers}}</li><li>Departure: {{departure_time}}</li><li>Total Amount: ₹{{total_amount}}</li></ul><p>Thank you for choosing MetroMerge!</p>', 
 'Booking Confirmed - Your booking {{booking_reference}} has been confirmed for {{route}} on {{travel_date}}. Bus: {{bus_number}}, Seats: {{seat_numbers}}, Departure: {{departure_time}}, Amount: ₹{{total_amount}}',
 '["booking_reference", "passenger_name", "route", "travel_date", "bus_number", "seat_numbers", "departure_time", "total_amount"]'),

('booking_cancellation', 'Booking Cancelled - {{booking_reference}}', 
 '<h1>Booking Cancelled</h1><p>Dear {{passenger_name}},</p><p>Your booking {{booking_reference}} has been cancelled as requested.</p><p>Refund Details:</p><ul><li>Refund Amount: ₹{{refund_amount}}</li><li>Processing Time: 5-7 business days</li></ul><p>We apologize for any inconvenience.</p>', 
 'Booking Cancelled - Your booking {{booking_reference}} has been cancelled. Refund amount: ₹{{refund_amount}} will be processed in 5-7 business days.',
 '["booking_reference", "passenger_name", "refund_amount"]'),

('vendor_approval', 'Vendor Account Approved - Welcome to MetroMerge', 
 '<h1>Welcome to MetroMerge!</h1><p>Dear {{business_name}},</p><p>Congratulations! Your vendor account has been approved.</p><p>You can now:</p><ul><li>Add your bus fleet</li><li>Create routes and schedules</li><li>Start receiving bookings</li></ul><p>Login to your dashboard to get started.</p>', 
 'Welcome to MetroMerge! Your vendor account for {{business_name}} has been approved. You can now login to your dashboard and start managing your fleet.',
 '["business_name"]'),

('password_reset', 'Reset Your Password - MetroMerge', 
 '<h1>Password Reset Request</h1><p>Dear {{user_name}},</p><p>You requested to reset your password. Click the link below to reset:</p><p><a href="{{reset_link}}">Reset Password</a></p><p>This link will expire in 1 hour.</p><p>If you did not request this, please ignore this email.</p>', 
 'Password Reset - Click this link to reset your password: {{reset_link}}. Link expires in 1 hour.',
 '["user_name", "reset_link"]');

-- Create admin user
INSERT INTO users (email, password_hash, first_name, last_name, role, status, email_verified) VALUES
('admin@metromerge.com', '$2b$10$example_hash_here', 'Super', 'Admin', 'super_admin', 'active', TRUE);

-- =====================================================
-- MIGRATION DOWN (for rollback)
-- =====================================================

-- DROP TABLE IF EXISTS email_templates;
-- DROP TABLE IF EXISTS system_settings;
-- DROP TABLE IF EXISTS cities;
-- DROP TABLE IF EXISTS vendors;
-- DROP TABLE IF EXISTS users;

-- =====================================================
-- MIGRATION METADATA
-- =====================================================

-- Record this migration
CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(50) PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT
);

INSERT INTO schema_migrations (version, description) VALUES 
('001_initial_schema', 'Initial database schema with users, vendors, cities, and basic configuration');

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Verify tables were created
SELECT 
    TABLE_NAME,
    TABLE_ROWS,
    CREATE_TIME
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = DATABASE()
ORDER BY TABLE_NAME;

-- Verify sample data
SELECT 'Cities' as entity, COUNT(*) as count FROM cities
UNION ALL
SELECT 'System Settings' as entity, COUNT(*) as count FROM system_settings
UNION ALL
SELECT 'Email Templates' as entity, COUNT(*) as count FROM email_templates
UNION ALL
SELECT 'Users' as entity, COUNT(*) as count FROM users;
