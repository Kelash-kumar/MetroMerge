-- MetroMerge Sample Data Seeds
-- This file contains sample data for development and testing

-- =====================================================
-- SAMPLE VENDORS
-- =====================================================

INSERT INTO vendors (
    id, business_name, business_type, owner_name, email, phone,
    gst_number, pan_number, bank_account_number, bank_name, ifsc_code,
    address_line_1, city, state, postal_code,
    status, verification_status, documents_verified,
    cancellation_policy, refund_policy, commission_rate
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Karachi Express Travels',
    'private_limited',
    'Muhammad Ahmed Khan',
    'contact@karachiexpress.com',
    '+92-21-98765-43210',
    'NTN-1234567-8',
    'CNIC-42101-1234567-1',
    '1234567890123456',
    'Habib Bank Limited',
    'HABB0001234',
    '123 Business Center, Gulshan-e-Iqbal',
    'Karachi',
    'Sindh',
    '75300',
    'active',
    'verified',
    TRUE,
    'Free cancellation up to 2 hours before departure. 50% refund for cancellations between 2-6 hours. No refund for cancellations within 2 hours.',
    'Refunds will be processed within 5-7 business days to the original payment method.',
    8.50
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'Sindh Royal Travels',
    'partnership',
    'Ali Hassan Memon',
    'info@sindhroyal.com',
    '+92-22-87654-32109',
    'NTN-2345678-9',
    'CNIC-44201-2345678-2',
    '2345678901234567',
    'National Bank of Pakistan',
    'NBPA0002345',
    '456 Transport Hub, Latifabad',
    'Hyderabad',
    'Sindh',
    '71000',
    'active',
    'verified',
    TRUE,
    'Cancellation allowed up to 1 hour before departure with 25% deduction.',
    'Refunds processed within 3-5 business days.',
    10.00
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    'Punjab Express',
    'private_limited',
    'Fatima Sheikh',
    'support@punjabexpress.com',
    '+92-42-76543-21098',
    'NTN-3456789-0',
    'CNIC-35202-3456789-3',
    '3456789012345678',
    'United Bank Limited',
    'UNIL0003456',
    '789 Bus Terminal Road, Model Town',
    'Lahore',
    'Punjab',
    '54000',
    'active',
    'verified',
    TRUE,
    'Free cancellation up to 4 hours before departure.',
    'Instant refund for online cancellations.',
    9.00
);

-- =====================================================
-- SAMPLE BUSES
-- =====================================================

INSERT INTO buses (
    id, vendor_id, registration_number, bus_model, manufacturer,
    year_of_manufacture, total_seats, bus_type,
    has_wifi, has_charging_point, has_entertainment, has_blanket,
    status, last_maintenance_date, next_maintenance_date
) VALUES 
(
    '660e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    'KHI-2023-1234',
    'Volvo B11R Multi-Axle',
    'Volvo',
    2022,
    45,
    'ac_sleeper',
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    'active',
    '2024-01-10',
    '2024-04-10'
),
(
    '660e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440001',
    'KHI-2024-5678',
    'Tata Starbus Ultra',
    'Tata Motors',
    2023,
    40,
    'ac_seater',
    TRUE,
    TRUE,
    FALSE,
    FALSE,
    'active',
    '2024-01-15',
    '2024-04-15'
),
(
    '660e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440002',
    'HYD-2022-9012',
    'Ashok Leyland Viking',
    'Ashok Leyland',
    2021,
    35,
    'non_ac_seater',
    FALSE,
    TRUE,
    FALSE,
    FALSE,
    'active',
    '2024-01-05',
    '2024-04-05'
),
(
    '660e8400-e29b-41d4-a716-446655440004',
    '550e8400-e29b-41d4-a716-446655440003',
    'LHR-2023-3456',
    'Mercedes-Benz Multi-Axle',
    'Mercedes-Benz',
    2023,
    50,
    'luxury',
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    'active',
    '2024-01-20',
    '2024-04-20'
);

-- =====================================================
-- SAMPLE ROUTES
-- =====================================================

-- Get city IDs for routes
SET @karachi_id = (SELECT id FROM cities WHERE name = 'Karachi' AND state = 'Sindh');
SET @hyderabad_id = (SELECT id FROM cities WHERE name = 'Hyderabad' AND state = 'Sindh');
SET @lahore_id = (SELECT id FROM cities WHERE name = 'Lahore' AND state = 'Punjab');
SET @islamabad_id = (SELECT id FROM cities WHERE name = 'Islamabad' AND state = 'Islamabad Capital Territory');
SET @umerkot_id = (SELECT id FROM cities WHERE name = 'Umerkot' AND state = 'Sindh');
SET @mithi_id = (SELECT id FROM cities WHERE name = 'Mithi' AND state = 'Sindh');
SET @jamshoro_id = (SELECT id FROM cities WHERE name = 'Jamshoro' AND state = 'Sindh');
SET @dadu_id = (SELECT id FROM cities WHERE name = 'Dadu' AND state = 'Sindh');

INSERT INTO routes (
    id, vendor_id, route_name, origin_city_id, destination_city_id,
    distance_km, estimated_duration_minutes, base_fare,
    route_description, is_active
) VALUES 
(
    '770e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    'Karachi - Hyderabad Express',
    @karachi_id,
    @hyderabad_id,
    165.00
    180,
    800.00,
    'Direct route via National Highway with comfortable journey',
    TRUE
),
(
    '770e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440001',
    'Karachi - Umerkot Highway',
    @karachi_id,
    @umerkot_id,
    420.00,
    360,
    1200.00,
    'Route via Hyderabad and Mirpurkhas with multiple stops',
    TRUE
),
(
    '770e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440002',
    'Hyderabad - Mithi Express',
    @hyderabad_id,
    @mithi_id,
    380.00,
    300,
    1000.00,
    'Premium service to Tharparkar region',
    TRUE
),
(
    '770e8400-e29b-41d4-a716-446655440004',
    '550e8400-e29b-41d4-a716-446655440003',
    'Lahore - Islamabad Express',
    @lahore_id,
    @islamabad_id,
    375.00,
    300,
    1500.00,
    'Luxury service between Punjab and Capital',
    TRUE
);

-- =====================================================
-- SAMPLE BUS SCHEDULES
-- =====================================================

INSERT INTO bus_schedules (
    id, vendor_id, bus_id, route_id,
    departure_time, arrival_time, effective_from, effective_to,
    base_fare, dynamic_pricing_enabled, is_active
) VALUES
(
    '880e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440001',
    '06:00:00',
    '09:00:00',
    '2024-01-01',
    '2024-12-31',
    800.00,
    TRUE,
    TRUE
),
(
    '880e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440001',
    '660e8400-e29b-41d4-a716-446655440002',
    '770e8400-e29b-41d4-a716-446655440002',
    '08:00:00',
    '14:00:00',
    '2024-01-01',
    '2024-12-31',
    1200.00,
    FALSE,
    TRUE
),
(
    '880e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440003',
    '660e8400-e29b-41d4-a716-446655440004',
    '770e8400-e29b-41d4-a716-446655440004',
    '20:00:00',
    '01:00:00',
    '2024-01-01',
    '2024-12-31',
    1500.00,
    TRUE,
    TRUE
);

-- =====================================================
-- SAMPLE VENDOR STAFF
-- =====================================================

INSERT INTO vendor_staff (
    id, vendor_id, employee_id, first_name, last_name, email, phone,
    role, join_date, salary, license_number, license_type,
    experience_years, status, assigned_bus_id
) VALUES 
(
    '990e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    'KE001',
    'Muhammad',
    'Hassan',
    'muhammad.hassan@karachiexpress.com',
    '+92-21-98765-43210',
    'driver',
    '2023-06-15',
    45000.00,
    'DL-KHI-1234567',
    'Heavy Vehicle',
    8,
    'active',
    '660e8400-e29b-41d4-a716-446655440001'
),
(
    '990e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440001',
    'KE002',
    'Ayesha',
    'Malik',
    'ayesha.malik@karachiexpress.com',
    '+92-21-87654-32109',
    'conductor',
    '2023-09-10',
    32000.00,
    NULL,
    NULL,
    3,
    'active',
    '660e8400-e29b-41d4-a716-446655440001'
),
(
    '990e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440001',
    'KE003',
    'Ahmed',
    'Ali',
    'ahmed.ali@karachiexpress.com',
    '+92-21-76543-21098',
    'mechanic',
    '2023-07-05',
    55000.00,
    NULL,
    NULL,
    10,
    'active',
    NULL
);

-- =====================================================
-- SAMPLE FAQS
-- =====================================================

INSERT INTO faqs (question, answer, category, display_order, is_active) VALUES 
('How can I cancel my booking?', 'You can cancel your booking by logging into your account and going to "My Bookings" section. Click on the booking you want to cancel and select "Cancel Booking". Cancellation charges may apply based on the vendor policy.', 'booking', 1, TRUE),
('When will I receive my refund?', 'Refunds are processed within 5-7 business days after cancellation. The amount will be credited to your original payment method in Pakistani Rupees (PKR). For instant refunds, some vendors offer immediate processing.', 'payment', 2, TRUE),
('Can I change my travel date?', 'Yes, you can modify your travel date subject to availability and fare difference. Please contact our support team or the vendor directly for assistance with date changes.', 'booking', 3, TRUE),
('What payment methods are accepted?', 'We accept all major credit cards, debit cards, online banking, JazzCash, EasyPaisa, and digital wallets. All payments are processed securely in Pakistani Rupees (PKR) through our payment gateway partners.', 'payment', 4, TRUE),
('How early should I reach the boarding point?', 'We recommend reaching the boarding point at least 15-30 minutes before the scheduled departure time. This allows time for ticket verification and boarding.', 'travel', 5, TRUE),
('What if my bus is delayed?', 'In case of delays, you will be notified via SMS and email. For significant delays, you may be eligible for compensation or alternative arrangements as per the vendor policy.', 'travel', 6, TRUE),
('Can I travel without a printed ticket?', 'Yes, you can show your e-ticket on your mobile phone. Make sure your phone is charged and the ticket is easily accessible for verification.', 'travel', 7, TRUE),
('What items are not allowed on the bus?', 'Prohibited items include flammable substances, weapons, illegal drugs, and excessive luggage. Each passenger is allowed one piece of luggage and one handbag.', 'travel', 8, TRUE);

-- =====================================================
-- SAMPLE BANNERS
-- =====================================================

INSERT INTO banners (
    title, description, image_url, link_url, button_text,
    display_order, is_active, start_date, end_date, target_user_type
) VALUES 
('Summer Sale - 20% Off', 'Book your bus tickets now and save 20% on all routes. Limited time offer!', '/images/banners/summer-sale.jpg', '/search', 'Book Now', 1, TRUE, '2024-01-01', '2024-03-31', 'all'),
('New Routes Available', 'Discover new destinations with our expanded route network across Pakistan', '/images/banners/new-routes.jpg', '/routes', 'Explore Routes', 2, TRUE, '2024-02-01', '2024-04-30', 'all'),
('Download Our Mobile App', 'Get the MetroMerge mobile app for easy booking and exclusive app-only deals', '/images/banners/mobile-app.jpg', '/download', 'Download App', 3, TRUE, '2024-01-01', '2024-12-31', 'new_users');

-- =====================================================
-- UPDATE STATISTICS
-- =====================================================

-- Update vendor statistics based on sample data
UPDATE vendors SET 
    total_bookings = 0,
    total_revenue = 0.00
WHERE id IN (
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440003'
);

-- Update bus statistics
UPDATE buses SET 
    total_trips = FLOOR(RAND() * 100) + 50,
    total_distance_km = FLOOR(RAND() * 10000) + 5000,
    total_revenue = FLOOR(RAND() * 100000) + 50000
WHERE vendor_id IN (
    '550e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440003'
);

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Show summary of seeded data
SELECT 'Vendors' as entity, COUNT(*) as count FROM vendors WHERE status = 'active'
UNION ALL
SELECT 'Buses' as entity, COUNT(*) as count FROM buses WHERE status = 'active'
UNION ALL
SELECT 'Routes' as entity, COUNT(*) as count FROM routes WHERE is_active = TRUE
UNION ALL
SELECT 'Schedules' as entity, COUNT(*) as count FROM bus_schedules WHERE is_active = TRUE
UNION ALL
SELECT 'Staff' as entity, COUNT(*) as count FROM vendor_staff WHERE status = 'active'
UNION ALL
SELECT 'FAQs' as entity, COUNT(*) as count FROM faqs WHERE is_active = TRUE
UNION ALL
SELECT 'Banners' as entity, COUNT(*) as count FROM banners WHERE is_active = TRUE;
