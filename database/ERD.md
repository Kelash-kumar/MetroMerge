# MetroMerge Database Entity Relationship Diagram

## Database Overview
This document describes the complete database structure for the MetroMerge bus ticketing platform, including all entities, relationships, and constraints.

## 🏗️ **Core Entities and Relationships**

### **1. User Management Module**

```
┌─────────────┐    ┌─────────────────┐
│    users    │────│ user_addresses  │
│             │    │                 │
│ • id (PK)   │    │ • id (PK)       │
│ • email     │    │ • user_id (FK)  │
│ • password  │    │ • address_type  │
│ • role      │    │ • is_default    │
│ • status    │    └─────────────────┘
└─────────────┘
```

**Relationships:**
- One user can have multiple addresses (1:N)
- Users can be customers, admins, or super admins

### **2. Vendor Management Module**

```
┌─────────────┐    ┌──────────────────┐
│   vendors   │────│ vendor_documents │
│             │    │                  │
│ • id (PK)   │    │ • id (PK)        │
│ • email     │    │ • vendor_id (FK) │
│ • status    │    │ • document_type  │
│ • verified  │    │ • status         │
└─────────────┘    └──────────────────┘
```

**Relationships:**
- One vendor can have multiple documents (1:N)
- Vendors are approved by admin users

### **3. Fleet Management Module**

```
┌─────────────┐    ┌──────────────────┐
│   vendors   │────│      buses       │
│             │    │                  │
│ • id (PK)   │    │ • id (PK)        │
└─────────────┘    │ • vendor_id (FK) │
                   │ • registration   │
                   │ • total_seats    │
                   │ • bus_type       │
                   └─────────┬────────┘
                             │
                   ┌─────────▼────────┐
                   │ bus_seat_layouts │
                   │                  │
                   │ • id (PK)        │
                   │ • bus_id (FK)    │
                   │ • seat_number    │
                   │ • seat_type      │
                   └──────────────────┘
```

**Relationships:**
- One vendor can have multiple buses (1:N)
- One bus can have multiple seat configurations (1:N)

### **4. Route Management Module**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   cities    │────│   routes    │────│ route_stops │
│             │    │             │    │             │
│ • id (PK)   │    │ • id (PK)   │    │ • id (PK)   │
│ • name      │    │ • origin    │    │ • route_id  │
│ • state     │    │ • dest      │    │ • city_id   │
└─────────────┘    │ • distance  │    │ • order     │
                   └─────────────┘    └─────────────┘
```

**Relationships:**
- Routes connect origin and destination cities (N:N through route_stops)
- Routes can have multiple intermediate stops (1:N)

### **5. Scheduling Module**

```
┌─────────────┐    ┌─────────────────┐
│   routes    │────│ bus_schedules   │
│             │    │                 │
│ • id (PK)   │    │ • id (PK)       │
└─────────────┘    │ • route_id (FK) │
                   │ • bus_id (FK)   │
┌─────────────┐    │ • departure     │
│    buses    │────│ • arrival       │
│             │    │ • operates_on   │
│ • id (PK)   │    └─────────────────┘
└─────────────┘
```

**Relationships:**
- One route can have multiple schedules (1:N)
- One bus can operate on multiple schedules (1:N)

### **6. Booking System Module**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    users    │────│  bookings   │────│  payments   │
│             │    │             │    │             │
│ • id (PK)   │    │ • id (PK)   │    │ • id (PK)   │
└─────────────┘    │ • user_id   │    │ • booking   │
                   │ • vendor_id │    │ • amount    │
┌─────────────┐    │ • bus_id    │    │ • status    │
│   vendors   │────│ • route_id  │    └─────────────┘
│             │    │ • schedule  │
│ • id (PK)   │    │ • seats     │    ┌─────────────┐
└─────────────┘    │ • amount    │────│   refunds   │
                   │ • status    │    │             │
┌─────────────┐    └─────────────┘    │ • id (PK)   │
│    buses    │────────────────────────│ • booking  │
│             │                       │ • amount    │
│ • id (PK)   │                       │ • status    │
└─────────────┘                       └─────────────┘
```

**Relationships:**
- One user can have multiple bookings (1:N)
- One booking belongs to one vendor, bus, route (N:1)
- One booking can have multiple payments (1:N)
- One booking can have multiple refunds (1:N)

### **7. Staff Management Module**

```
┌─────────────┐    ┌─────────────────┐
│   vendors   │────│ vendor_staff    │
│             │    │                 │
│ • id (PK)   │    │ • id (PK)       │
└─────────────┘    │ • vendor_id     │
                   │ • role          │
┌─────────────┐    │ • license_no    │
│    buses    │────│ • assigned_bus  │
│             │    │ • status        │
│ • id (PK)   │    └─────────────────┘
└─────────────┘
```

**Relationships:**
- One vendor can have multiple staff members (1:N)
- One staff member can be assigned to one bus (N:1)

### **8. Support System Module**

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────────────────┐
│    users    │────│ support_tickets  │────│ support_ticket_messages │
│             │    │                  │    │                         │
│ • id (PK)   │    │ • id (PK)        │    │ • id (PK)               │
└─────────────┘    │ • created_by     │    │ • ticket_id (FK)        │
                   │ • assigned_to    │    │ • sender_user_id        │
┌─────────────┐    │ • booking_id     │    │ • message               │
│  bookings   │────│ • category       │    │ • created_at            │
│             │    │ • priority       │    └─────────────────────────┘
│ • id (PK)   │    │ • status         │
└─────────────┘    └──────────────────┘
```

**Relationships:**
- One user can create multiple support tickets (1:N)
- One ticket can have multiple messages (1:N)
- Tickets can be related to specific bookings (N:1)

### **9. Content Management Module**

```
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    faqs     │    │    banners      │    │ system_settings │
│             │    │                 │    │                 │
│ • id (PK)   │    │ • id (PK)       │    │ • id (PK)       │
│ • question  │    │ • title         │    │ • setting_key   │
│ • answer    │    │ • description   │    │ • setting_value │
│ • category  │    │ • image_url     │    │ • is_public     │
│ • is_active │    │ • is_active     │    └─────────────────┘
└─────────────┘    └─────────────────┘
```

**Relationships:**
- Independent entities for content management
- No direct relationships with other modules

### **10. Communication Module**

```
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    users    │────│ notifications   │    │ email_templates │
│             │    │                 │    │                 │
│ • id (PK)   │    │ • id (PK)       │    │ • id (PK)       │
└─────────────┘    │ • recipient     │    │ • template_name │
                   │ • title         │    │ • subject       │
┌─────────────┐    │ • message       │    │ • html_content  │
│   vendors   │────│ • type          │    │ • variables     │
│             │    │ • is_read       │    └─────────────────┘
│ • id (PK)   │    └─────────────────┘
└─────────────┘
```

**Relationships:**
- Notifications can be sent to users or vendors (N:1)
- Email templates are independent reference data

### **11. Reviews and Analytics Module**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────────┐
│  bookings   │────│   reviews   │    │ daily_analytics │
│             │    │             │    │                 │
│ • id (PK)   │    │ • id (PK)   │    │ • id (PK)       │
└─────────────┘    │ • booking   │    │ • date          │
                   │ • rating    │    │ • vendor_id     │
┌─────────────┐    │ • review    │    │ • bookings      │
│    users    │────│ • approved  │    │ • revenue       │
│             │    └─────────────┘    │ • metrics       │
│ • id (PK)   │                       └─────────────────┘
└─────────────┘
```

**Relationships:**
- One booking can have one review (1:1)
- Analytics are aggregated by vendor and date

## 🔑 **Key Constraints and Business Rules**

### **Primary Keys**
- All tables use UUID primary keys for scalability
- UUIDs enable distributed systems and prevent ID conflicts

### **Foreign Key Constraints**
- All relationships enforced with foreign key constraints
- Cascade deletes where appropriate (e.g., user addresses)
- Set NULL for optional relationships (e.g., staff bus assignment)

### **Unique Constraints**
- User emails must be unique
- Vendor emails must be unique
- Bus registration numbers must be unique
- Booking references must be unique

### **Check Constraints**
- Ratings must be between 1-5
- Seat numbers must be valid for bus capacity
- Dates must be logical (departure before arrival)

### **Business Logic Constraints**
- Bookings cannot exceed bus capacity
- Cancellations must follow vendor policies
- Payments must match booking amounts
- Staff can only be assigned to vendor's buses

## 📊 **Indexing Strategy**

### **Performance Indexes**
```sql
-- Booking queries
CREATE INDEX idx_bookings_vendor_date ON bookings(vendor_id, travel_date);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, booking_status);

-- Schedule queries
CREATE INDEX idx_schedules_route_time ON bus_schedules(route_id, departure_time);

-- Payment queries
CREATE INDEX idx_payments_status_date ON payments(status, initiated_at);

-- Search queries
CREATE INDEX idx_routes_origin_dest ON routes(origin_city_id, destination_city_id);
```

### **Composite Indexes**
- Multi-column indexes for common query patterns
- Covering indexes for frequently accessed data
- Partial indexes for filtered queries

## 🔒 **Security Considerations**

### **Data Protection**
- Password hashing with bcrypt/argon2
- Sensitive data encryption at rest
- PII data anonymization for analytics

### **Access Control**
- Role-based access control (RBAC)
- Row-level security for multi-tenant data
- API rate limiting and authentication

### **Audit Trail**
- Comprehensive audit logging
- Change tracking for critical operations
- Compliance with data protection regulations

## 📈 **Scalability Features**

### **Horizontal Scaling**
- UUID primary keys for distributed systems
- Partitioning strategy for large tables
- Read replicas for query performance

### **Vertical Scaling**
- Optimized queries and indexes
- Connection pooling
- Query result caching

### **Data Archival**
- Historical data archival strategy
- Soft deletes for data recovery
- Backup and disaster recovery plans

This ERD represents a production-ready database design that can handle the complexities of a modern bus ticketing platform while maintaining data integrity, performance, and scalability.
