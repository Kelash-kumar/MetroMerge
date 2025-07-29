-- MetroMerge Database Schema
-- Complete database structure for bus ticketing and vendor management platform
-- Created: 2024-01-27

-- =====================================================
-- USERS AND AUTHENTICATION
-- =====================================================

-- Users table for customers and admin users
CREATE TABLE users (
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

-- User addresses for multiple addresses per user
CREATE TABLE user_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    address_type ENUM('home', 'work', 'other') DEFAULT 'home',
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- =====================================================
-- VENDORS AND BUSINESS
-- =====================================================

-- Vendors/Bus operators
CREATE TABLE vendors (
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
    commission_rate DECIMAL(5,2) DEFAULT 10.00, -- Percentage
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

-- Vendor documents for verification
CREATE TABLE vendor_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL,
    document_type ENUM('gst_certificate', 'pan_card', 'business_registration', 'bank_statement', 'address_proof', 'other') NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_url VARCHAR(500) NOT NULL,
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    rejection_reason TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP,
    verified_by UUID,
    
    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id),
    INDEX idx_vendor_id (vendor_id),
    INDEX idx_document_type (document_type)
);

-- =====================================================
-- FLEET MANAGEMENT
-- =====================================================

-- Bus fleet
CREATE TABLE buses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL,
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    bus_model VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100),
    year_of_manufacture YEAR,
    
    -- Capacity and Type
    total_seats INT NOT NULL,
    bus_type ENUM('ac_sleeper', 'ac_seater', 'non_ac_seater', 'semi_sleeper', 'luxury') NOT NULL,
    
    -- Features
    has_wifi BOOLEAN DEFAULT FALSE,
    has_charging_point BOOLEAN DEFAULT FALSE,
    has_entertainment BOOLEAN DEFAULT FALSE,
    has_blanket BOOLEAN DEFAULT FALSE,
    has_pillow BOOLEAN DEFAULT FALSE,
    has_water_bottle BOOLEAN DEFAULT FALSE,
    has_snacks BOOLEAN DEFAULT FALSE,
    
    -- Status and Maintenance
    status ENUM('active', 'maintenance', 'inactive', 'retired') DEFAULT 'active',
    last_maintenance_date DATE,
    next_maintenance_date DATE,
    maintenance_notes TEXT,
    
    -- Insurance and Permits
    insurance_number VARCHAR(100),
    insurance_expiry_date DATE,
    permit_number VARCHAR(100),
    permit_expiry_date DATE,
    fitness_certificate_number VARCHAR(100),
    fitness_certificate_expiry DATE,
    
    -- Performance Metrics
    total_trips INT DEFAULT 0,
    total_distance_km DECIMAL(10,2) DEFAULT 0.00,
    total_revenue DECIMAL(15,2) DEFAULT 0.00,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    INDEX idx_vendor_id (vendor_id),
    INDEX idx_registration_number (registration_number),
    INDEX idx_status (status)
);

-- Bus seat layout configuration
CREATE TABLE bus_seat_layouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bus_id UUID NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    seat_type ENUM('seater', 'sleeper_lower', 'sleeper_upper') NOT NULL,
    row_number INT NOT NULL,
    column_number INT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    price_multiplier DECIMAL(3,2) DEFAULT 1.00, -- For premium seats
    
    FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_bus_seat (bus_id, seat_number),
    INDEX idx_bus_id (bus_id)
);

-- =====================================================
-- ROUTES AND SCHEDULES
-- =====================================================

-- Cities master data
CREATE TABLE cities (
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

-- Bus routes
CREATE TABLE routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL,
    route_name VARCHAR(255) NOT NULL,
    origin_city_id UUID NOT NULL,
    destination_city_id UUID NOT NULL,
    distance_km DECIMAL(8,2) NOT NULL,
    estimated_duration_minutes INT NOT NULL,
    base_fare DECIMAL(10,2) NOT NULL,
    
    -- Route Details
    route_description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Performance Metrics
    total_bookings INT DEFAULT 0,
    total_revenue DECIMAL(15,2) DEFAULT 0.00,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    FOREIGN KEY (origin_city_id) REFERENCES cities(id),
    FOREIGN KEY (destination_city_id) REFERENCES cities(id),
    INDEX idx_vendor_id (vendor_id),
    INDEX idx_origin_destination (origin_city_id, destination_city_id)
);

-- Route stops/intermediate cities
CREATE TABLE route_stops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID NOT NULL,
    city_id UUID NOT NULL,
    stop_order INT NOT NULL,
    arrival_time TIME,
    departure_time TIME,
    stop_duration_minutes INT DEFAULT 10,
    distance_from_origin_km DECIMAL(8,2),
    fare_from_origin DECIMAL(10,2),
    
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id),
    UNIQUE KEY unique_route_stop_order (route_id, stop_order),
    INDEX idx_route_id (route_id)
);

-- Bus schedules
CREATE TABLE bus_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL,
    bus_id UUID NOT NULL,
    route_id UUID NOT NULL,
    
    -- Schedule Details
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE,
    
    -- Days of operation
    operates_on_monday BOOLEAN DEFAULT TRUE,
    operates_on_tuesday BOOLEAN DEFAULT TRUE,
    operates_on_wednesday BOOLEAN DEFAULT TRUE,
    operates_on_thursday BOOLEAN DEFAULT TRUE,
    operates_on_friday BOOLEAN DEFAULT TRUE,
    operates_on_saturday BOOLEAN DEFAULT TRUE,
    operates_on_sunday BOOLEAN DEFAULT TRUE,
    
    -- Pricing
    base_fare DECIMAL(10,2) NOT NULL,
    dynamic_pricing_enabled BOOLEAN DEFAULT FALSE,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    FOREIGN KEY (bus_id) REFERENCES buses(id) ON DELETE CASCADE,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
    INDEX idx_vendor_id (vendor_id),
    INDEX idx_bus_id (bus_id),
    INDEX idx_route_id (route_id),
    INDEX idx_departure_time (departure_time)
);

-- =====================================================
-- BOOKINGS AND PAYMENTS
-- =====================================================

-- Bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID NOT NULL,
    vendor_id UUID NOT NULL,
    bus_id UUID NOT NULL,
    route_id UUID NOT NULL,
    schedule_id UUID NOT NULL,

    -- Journey Details
    travel_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    origin_city_id UUID NOT NULL,
    destination_city_id UUID NOT NULL,
    boarding_point VARCHAR(255),
    dropping_point VARCHAR(255),

    -- Passenger Details
    passenger_name VARCHAR(255) NOT NULL,
    passenger_age INT,
    passenger_gender ENUM('male', 'female', 'other'),
    passenger_phone VARCHAR(20),
    passenger_email VARCHAR(255),

    -- Seat Details
    seat_numbers JSON NOT NULL, -- Array of seat numbers
    total_seats INT NOT NULL,

    -- Pricing
    base_fare DECIMAL(10,2) NOT NULL,
    taxes DECIMAL(10,2) DEFAULT 0.00,
    convenience_fee DECIMAL(10,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,

    -- Status
    booking_status ENUM('pending', 'confirmed', 'cancelled', 'completed', 'no_show') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded', 'partially_refunded') DEFAULT 'pending',

    -- Cancellation
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP,
    cancelled_by UUID,
    refund_amount DECIMAL(10,2) DEFAULT 0.00,
    refund_processed_at TIMESTAMP,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id),
    FOREIGN KEY (bus_id) REFERENCES buses(id),
    FOREIGN KEY (route_id) REFERENCES routes(id),
    FOREIGN KEY (schedule_id) REFERENCES bus_schedules(id),
    FOREIGN KEY (origin_city_id) REFERENCES cities(id),
    FOREIGN KEY (destination_city_id) REFERENCES cities(id),
    FOREIGN KEY (cancelled_by) REFERENCES users(id),

    INDEX idx_booking_reference (booking_reference),
    INDEX idx_user_id (user_id),
    INDEX idx_vendor_id (vendor_id),
    INDEX idx_travel_date (travel_date),
    INDEX idx_booking_status (booking_status),
    INDEX idx_payment_status (payment_status)
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL,
    payment_reference VARCHAR(100) UNIQUE NOT NULL,
    payment_gateway ENUM('razorpay', 'payu', 'stripe', 'paypal', 'upi', 'wallet') NOT NULL,
    gateway_transaction_id VARCHAR(255),

    -- Amount Details
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',

    -- Payment Method
    payment_method ENUM('credit_card', 'debit_card', 'net_banking', 'upi', 'wallet', 'cash') NOT NULL,

    -- Status
    status ENUM('pending', 'processing', 'success', 'failed', 'cancelled', 'refunded') DEFAULT 'pending',
    failure_reason TEXT,

    -- Gateway Response
    gateway_response JSON,

    -- Timestamps
    initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,

    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_booking_id (booking_id),
    INDEX idx_payment_reference (payment_reference),
    INDEX idx_status (status)
);

-- Refunds
CREATE TABLE refunds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL,
    payment_id UUID NOT NULL,
    refund_reference VARCHAR(100) UNIQUE NOT NULL,

    -- Refund Details
    refund_amount DECIMAL(10,2) NOT NULL,
    refund_reason ENUM('user_cancellation', 'vendor_cancellation', 'technical_issue', 'other') NOT NULL,
    refund_reason_description TEXT,

    -- Processing
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    gateway_refund_id VARCHAR(255),

    -- Timestamps
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP,

    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (payment_id) REFERENCES payments(id),
    INDEX idx_booking_id (booking_id),
    INDEX idx_refund_reference (refund_reference)
);

-- =====================================================
-- STAFF MANAGEMENT
-- =====================================================

-- Vendor staff (drivers, conductors, etc.)
CREATE TABLE vendor_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL,
    employee_id VARCHAR(50) UNIQUE NOT NULL,

    -- Personal Details
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),

    -- Address
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,

    -- Employment Details
    role ENUM('driver', 'conductor', 'mechanic', 'cleaner', 'supervisor', 'other') NOT NULL,
    employment_type ENUM('full_time', 'part_time', 'contract') DEFAULT 'full_time',
    join_date DATE NOT NULL,
    salary DECIMAL(10,2),

    -- License and Certifications (for drivers)
    license_number VARCHAR(50),
    license_type VARCHAR(50),
    license_expiry_date DATE,
    experience_years INT DEFAULT 0,

    -- Status
    status ENUM('active', 'inactive', 'suspended', 'terminated') DEFAULT 'active',

    -- Assigned Bus
    assigned_bus_id UUID,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_bus_id) REFERENCES buses(id) ON DELETE SET NULL,
    INDEX idx_vendor_id (vendor_id),
    INDEX idx_employee_id (employee_id),
    INDEX idx_role (role),
    INDEX idx_status (status)
);

-- =====================================================
-- SUPPORT AND COMMUNICATION
-- =====================================================

-- Support tickets
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(20) UNIQUE NOT NULL,

    -- Ticket Details
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('booking', 'payment', 'technical', 'general', 'complaint', 'refund') NOT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',

    -- Parties Involved
    created_by_user_id UUID,
    created_by_vendor_id UUID,
    assigned_to_user_id UUID,

    -- Related Entities
    booking_id UUID,
    vendor_id UUID,

    -- Status
    status ENUM('open', 'in_progress', 'resolved', 'closed', 'escalated') DEFAULT 'open',

    -- Resolution
    resolution TEXT,
    resolved_at TIMESTAMP,
    resolved_by UUID,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (created_by_user_id) REFERENCES users(id),
    FOREIGN KEY (created_by_vendor_id) REFERENCES vendors(id),
    FOREIGN KEY (assigned_to_user_id) REFERENCES users(id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id),
    FOREIGN KEY (resolved_by) REFERENCES users(id),

    INDEX idx_ticket_number (ticket_number),
    INDEX idx_category (category),
    INDEX idx_status (status),
    INDEX idx_priority (priority)
);

-- Support ticket messages/responses
CREATE TABLE support_ticket_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL,
    sender_user_id UUID,
    sender_vendor_id UUID,
    message TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT FALSE,
    attachments JSON, -- Array of file URLs

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_user_id) REFERENCES users(id),
    FOREIGN KEY (sender_vendor_id) REFERENCES vendors(id),
    INDEX idx_ticket_id (ticket_id)
);

-- =====================================================
-- CONTENT MANAGEMENT
-- =====================================================

-- FAQs
CREATE TABLE faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_category (category),
    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active)
);

-- Homepage banners
CREATE TABLE banners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    link_url VARCHAR(500),
    button_text VARCHAR(100),

    -- Display Settings
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,

    -- Schedule
    start_date DATE,
    end_date DATE,

    -- Target Audience
    target_user_type ENUM('all', 'new_users', 'existing_users') DEFAULT 'all',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_display_order (display_order),
    INDEX idx_is_active (is_active),
    INDEX idx_date_range (start_date, end_date)
);

-- System settings/configuration
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE, -- Whether setting can be accessed by frontend

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_setting_key (setting_key),
    INDEX idx_is_public (is_public)
);

-- =====================================================
-- NOTIFICATIONS AND COMMUNICATION
-- =====================================================

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_user_id UUID,
    recipient_vendor_id UUID,

    -- Notification Content
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type ENUM('booking', 'payment', 'cancellation', 'promotion', 'system', 'support') NOT NULL,

    -- Delivery Channels
    send_email BOOLEAN DEFAULT FALSE,
    send_sms BOOLEAN DEFAULT FALSE,
    send_push BOOLEAN DEFAULT TRUE,
    send_in_app BOOLEAN DEFAULT TRUE,

    -- Status
    is_read BOOLEAN DEFAULT FALSE,
    email_sent BOOLEAN DEFAULT FALSE,
    sms_sent BOOLEAN DEFAULT FALSE,
    push_sent BOOLEAN DEFAULT FALSE,

    -- Related Entities
    booking_id UUID,
    payment_id UUID,

    -- Scheduling
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (recipient_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (payment_id) REFERENCES payments(id),

    INDEX idx_recipient_user (recipient_user_id),
    INDEX idx_recipient_vendor (recipient_vendor_id),
    INDEX idx_notification_type (notification_type),
    INDEX idx_is_read (is_read)
);

-- Email templates
CREATE TABLE email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name VARCHAR(100) UNIQUE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT,
    template_variables JSON, -- Available variables for the template
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_template_name (template_name),
    INDEX idx_is_active (is_active)
);

-- =====================================================
-- REVIEWS AND RATINGS
-- =====================================================

-- Reviews and ratings
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL,
    user_id UUID NOT NULL,
    vendor_id UUID NOT NULL,
    bus_id UUID NOT NULL,

    -- Rating (1-5 scale)
    overall_rating INT NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
    cleanliness_rating INT CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
    punctuality_rating INT CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
    staff_behavior_rating INT CHECK (staff_behavior_rating >= 1 AND staff_behavior_rating <= 5),

    -- Review Content
    review_title VARCHAR(255),
    review_text TEXT,

    -- Status
    is_approved BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,

    -- Response from vendor
    vendor_response TEXT,
    vendor_response_date TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id),
    FOREIGN KEY (bus_id) REFERENCES buses(id),

    UNIQUE KEY unique_booking_review (booking_id),
    INDEX idx_vendor_id (vendor_id),
    INDEX idx_overall_rating (overall_rating),
    INDEX idx_is_approved (is_approved)
);

-- =====================================================
-- ANALYTICS AND REPORTING
-- =====================================================

-- Daily analytics summary
CREATE TABLE daily_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    vendor_id UUID,

    -- Booking Metrics
    total_bookings INT DEFAULT 0,
    confirmed_bookings INT DEFAULT 0,
    cancelled_bookings INT DEFAULT 0,
    no_show_bookings INT DEFAULT 0,

    -- Revenue Metrics
    total_revenue DECIMAL(15,2) DEFAULT 0.00,
    commission_earned DECIMAL(15,2) DEFAULT 0.00,
    refund_amount DECIMAL(15,2) DEFAULT 0.00,

    -- User Metrics
    new_users INT DEFAULT 0,
    returning_users INT DEFAULT 0,

    -- Performance Metrics
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    occupancy_rate DECIMAL(5,2) DEFAULT 0.00, -- Percentage

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    UNIQUE KEY unique_date_vendor (date, vendor_id),
    INDEX idx_date (date),
    INDEX idx_vendor_id (vendor_id)
);

-- =====================================================
-- AUDIT AND LOGGING
-- =====================================================

-- Audit log for tracking changes
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    old_values JSON,
    new_values JSON,
    changed_by_user_id UUID,
    changed_by_vendor_id UUID,
    ip_address VARCHAR(45),
    user_agent TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (changed_by_user_id) REFERENCES users(id),
    FOREIGN KEY (changed_by_vendor_id) REFERENCES vendors(id),

    INDEX idx_table_record (table_name, record_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Additional composite indexes for common queries
CREATE INDEX idx_bookings_vendor_date ON bookings(vendor_id, travel_date);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, booking_status);
CREATE INDEX idx_schedules_route_time ON bus_schedules(route_id, departure_time);
CREATE INDEX idx_payments_status_date ON payments(status, initiated_at);
CREATE INDEX idx_notifications_recipient_read ON notifications(recipient_user_id, is_read);

-- =====================================================
-- SAMPLE DATA INSERTS
-- =====================================================

-- Insert sample cities (Pakistan)
INSERT INTO cities (id, name, state, country) VALUES
(gen_random_uuid(), 'Karachi', 'Sindh', 'Pakistan'),
(gen_random_uuid(), 'Hyderabad', 'Sindh', 'Pakistan'),
(gen_random_uuid(), 'Lahore', 'Punjab', 'Pakistan'),
(gen_random_uuid(), 'Islamabad', 'Islamabad Capital Territory', 'Pakistan'),
(gen_random_uuid(), 'Rawalpindi', 'Punjab', 'Pakistan'),
(gen_random_uuid(), 'Faisalabad', 'Punjab', 'Pakistan'),
(gen_random_uuid(), 'Multan', 'Punjab', 'Pakistan'),
(gen_random_uuid(), 'Peshawar', 'Khyber Pakhtunkhwa', 'Pakistan'),
(gen_random_uuid(), 'Quetta', 'Balochistan', 'Pakistan'),
(gen_random_uuid(), 'Umerkot', 'Sindh', 'Pakistan'),
(gen_random_uuid(), 'Mithi', 'Sindh', 'Pakistan'),
(gen_random_uuid(), 'Jamshoro', 'Sindh', 'Pakistan'),
(gen_random_uuid(), 'Dadu', 'Sindh', 'Pakistan'),
(gen_random_uuid(), 'Sukkur', 'Sindh', 'Pakistan'),
(gen_random_uuid(), 'Larkana', 'Sindh', 'Pakistan');

-- Insert sample system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('platform_commission_rate', '10.00', 'number', 'Default commission rate for vendors', FALSE),
('booking_cancellation_hours', '2', 'number', 'Hours before departure when cancellation is allowed', TRUE),
('max_seats_per_booking', '6', 'number', 'Maximum seats that can be booked in single transaction', TRUE),
('platform_name', 'MetroMerge', 'string', 'Platform name', TRUE),
('support_email', 'support@metromerge.com', 'string', 'Support email address', TRUE),
('support_phone', '+92-21-111-123-456', 'string', 'Support phone number', TRUE),
('platform_currency', 'PKR', 'string', 'Platform currency', TRUE),
('currency_symbol', 'Rs.', 'string', 'Currency symbol', TRUE);

-- Insert sample email templates
INSERT INTO email_templates (template_name, subject, html_content, text_content) VALUES
('booking_confirmation', 'Booking Confirmed - {{booking_reference}}',
 '<h1>Booking Confirmed</h1><p>Your booking {{booking_reference}} has been confirmed for {{route}} on {{travel_date}}.</p><p>Amount: Rs.{{total_amount}}</p>',
 'Booking Confirmed - Your booking {{booking_reference}} has been confirmed for {{route}} on {{travel_date}}. Amount: Rs.{{total_amount}}'),
('booking_cancellation', 'Booking Cancelled - {{booking_reference}}',
 '<h1>Booking Cancelled</h1><p>Your booking {{booking_reference}} has been cancelled.</p><p>Refund: Rs.{{refund_amount}}</p>',
 'Booking Cancelled - Your booking {{booking_reference}} has been cancelled. Refund: Rs.{{refund_amount}}');

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for vendor dashboard statistics
CREATE VIEW vendor_dashboard_stats AS
SELECT
    v.id as vendor_id,
    v.business_name,
    COUNT(DISTINCT b.id) as total_buses,
    COUNT(DISTINCT r.id) as total_routes,
    COUNT(DISTINCT bk.id) as total_bookings,
    COALESCE(SUM(bk.total_amount), 0) as total_revenue,
    COALESCE(AVG(rv.overall_rating), 0) as average_rating
FROM vendors v
LEFT JOIN buses b ON v.id = b.vendor_id AND b.status = 'active'
LEFT JOIN routes r ON v.id = r.vendor_id AND r.is_active = TRUE
LEFT JOIN bookings bk ON v.id = bk.vendor_id AND bk.booking_status IN ('confirmed', 'completed')
LEFT JOIN reviews rv ON v.id = rv.vendor_id AND rv.is_approved = TRUE
WHERE v.status = 'active'
GROUP BY v.id, v.business_name;

-- View for popular routes
CREATE VIEW popular_routes AS
SELECT
    r.id,
    r.route_name,
    oc.name as origin_city,
    dc.name as destination_city,
    COUNT(bk.id) as total_bookings,
    COALESCE(SUM(bk.total_amount), 0) as total_revenue,
    COALESCE(AVG(rv.overall_rating), 0) as average_rating
FROM routes r
JOIN cities oc ON r.origin_city_id = oc.id
JOIN cities dc ON r.destination_city_id = dc.id
LEFT JOIN bookings bk ON r.id = bk.route_id AND bk.booking_status IN ('confirmed', 'completed')
LEFT JOIN reviews rv ON bk.id = rv.booking_id AND rv.is_approved = TRUE
WHERE r.is_active = TRUE
GROUP BY r.id, r.route_name, oc.name, dc.name
ORDER BY total_bookings DESC;

-- =====================================================
-- STORED PROCEDURES
-- =====================================================

DELIMITER //

-- Procedure to calculate vendor commission
CREATE PROCEDURE CalculateVendorCommission(
    IN vendor_id_param UUID,
    IN start_date DATE,
    IN end_date DATE
)
BEGIN
    SELECT
        v.business_name,
        COUNT(b.id) as total_bookings,
        SUM(b.total_amount) as gross_revenue,
        SUM(b.total_amount * v.commission_rate / 100) as commission_amount,
        SUM(b.total_amount * (100 - v.commission_rate) / 100) as vendor_payout
    FROM vendors v
    JOIN bookings b ON v.id = b.vendor_id
    WHERE v.id = vendor_id_param
    AND b.travel_date BETWEEN start_date AND end_date
    AND b.booking_status IN ('confirmed', 'completed')
    AND b.payment_status = 'paid'
    GROUP BY v.id, v.business_name;
END //

DELIMITER ;

-- =====================================================
-- TRIGGERS
-- =====================================================

DELIMITER //

-- Trigger to update vendor stats when booking is created
CREATE TRIGGER update_vendor_stats_after_booking
AFTER INSERT ON bookings
FOR EACH ROW
BEGIN
    UPDATE vendors
    SET total_bookings = total_bookings + 1,
        total_revenue = total_revenue + NEW.total_amount
    WHERE id = NEW.vendor_id;
END //

-- Trigger to update bus stats when booking is created
CREATE TRIGGER update_bus_stats_after_booking
AFTER INSERT ON bookings
FOR EACH ROW
BEGIN
    UPDATE buses
    SET total_trips = total_trips + 1,
        total_revenue = total_revenue + NEW.total_amount
    WHERE id = NEW.bus_id;
END //

DELIMITER ;
