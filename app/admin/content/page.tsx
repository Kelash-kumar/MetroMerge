'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  Upload,
  Eye
} from 'lucide-react';

// Mock content data
const mockFAQs = [
  {
    id: 'faq1',
    question: 'How can I cancel my booking?',
    answer: 'You can cancel your booking by logging into your account and going to "My Bookings" section. Click on the booking you want to cancel and select "Cancel Booking".',
    isActive: true,
    order: 1
  },
  {
    id: 'faq2',
    question: 'When will I receive my refund?',
    answer: 'Refunds are processed within 5-7 business days after cancellation. The amount will be credited to your original payment method.',
    isActive: true,
    order: 2
  },
  {
    id: 'faq3',
    question: 'Can I change my travel date?',
    answer: 'Yes, you can modify your travel date subject to availability and fare difference. Please contact our support team for assistance.',
    isActive: true,
    order: 3
  }
];

const mockBanners = [
  {
    id: 'banner1',
    title: 'Summer Sale - 20% Off',
    description: 'Book your bus tickets now and save 20% on all routes',
    imageUrl: '/placeholder.jpg',
    linkUrl: '/search',
    isActive: true,
    startDate: '2024-01-01',
    endDate: '2024-03-31'
  },
  {
    id: 'banner2',
    title: 'New Routes Available',
    description: 'Discover new destinations with our expanded route network',
    imageUrl: '/placeholder.jpg',
    linkUrl: '/search',
    isActive: false,
    startDate: '2024-02-01',
    endDate: '2024-04-30'
  }
];

const mockContactInfo = {
  phone: '+91 1800-123-4567',
  email: 'support@metromerge.com',
  address: '123 Business Park, Mumbai, Maharashtra 400001',
  workingHours: 'Monday to Sunday: 6:00 AM - 10:00 PM',
  emergencyContact: '+91 98765-43210'
};

export default function ContentManagement() {
  const { user } = useAuth();
  const [faqs, setFaqs] = useState(mockFAQs);
  const [banners, setBanners] = useState(mockBanners);
  const [contactInfo, setContactInfo] = useState(mockContactInfo);
  const [isAddFAQOpen, setIsAddFAQOpen] = useState(false);
  const [isAddBannerOpen, setIsAddBannerOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<any>(null);
  const [editingBanner, setEditingBanner] = useState<any>(null);

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  const handleSaveFAQ = (faq: any) => {
    if (editingFAQ) {
      setFaqs(faqs.map(f => f.id === editingFAQ.id ? { ...faq, id: editingFAQ.id } : f));
      setEditingFAQ(null);
    } else {
      setFaqs([...faqs, { ...faq, id: `faq${Date.now()}` }]);
    }
    setIsAddFAQOpen(false);
  };

  const handleDeleteFAQ = (id: string) => {
    setFaqs(faqs.filter(f => f.id !== id));
  };

  const handleToggleFAQ = (id: string) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, isActive: !f.isActive } : f));
  };

  const handleSaveBanner = (banner: any) => {
    if (editingBanner) {
      setBanners(banners.map(b => b.id === editingBanner.id ? { ...banner, id: editingBanner.id } : b));
      setEditingBanner(null);
    } else {
      setBanners([...banners, { ...banner, id: `banner${Date.now()}` }]);
    }
    setIsAddBannerOpen(false);
  };

  const handleDeleteBanner = (id: string) => {
    setBanners(banners.filter(b => b.id !== id));
  };

  const handleToggleBanner = (id: string) => {
    setBanners(banners.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b));
  };

  const handleSaveContactInfo = () => {
    // In a real app, this would save to the backend
    console.log('Saving contact info:', contactInfo);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-600">Manage website content, FAQs, banners, and contact information</p>
      </div>

      <Tabs defaultValue="faqs" className="space-y-6">
        <TabsList>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
        </TabsList>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <Dialog open={isAddFAQOpen} onOpenChange={setIsAddFAQOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingFAQ(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add FAQ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
                  <DialogDescription>
                    {editingFAQ ? 'Update the FAQ information' : 'Create a new frequently asked question'}
                  </DialogDescription>
                </DialogHeader>
                <FAQForm 
                  faq={editingFAQ} 
                  onSave={handleSaveFAQ} 
                  onCancel={() => setIsAddFAQOpen(false)} 
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq) => (
              <Card key={faq.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={faq.isActive}
                        onCheckedChange={() => handleToggleFAQ(faq.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingFAQ(faq);
                          setIsAddFAQOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFAQ(faq.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Banners Tab */}
        <TabsContent value="banners" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Homepage Banners</h2>
            <Dialog open={isAddBannerOpen} onOpenChange={setIsAddBannerOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingBanner(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Banner
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingBanner ? 'Edit Banner' : 'Add New Banner'}</DialogTitle>
                  <DialogDescription>
                    {editingBanner ? 'Update the banner information' : 'Create a new homepage banner'}
                  </DialogDescription>
                </DialogHeader>
                <BannerForm 
                  banner={editingBanner} 
                  onSave={handleSaveBanner} 
                  onCancel={() => setIsAddBannerOpen(false)} 
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {banners.map((banner) => (
              <Card key={banner.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{banner.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={banner.isActive}
                        onCheckedChange={() => handleToggleBanner(banner.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingBanner(banner);
                          setIsAddBannerOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBanner(banner.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">{banner.description}</p>
                  <div className="text-sm text-gray-500">
                    <p>Active: {banner.startDate} to {banner.endDate}</p>
                    <p>Link: {banner.linkUrl}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contact Info Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <Button onClick={handleSaveContactInfo}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    value={contactInfo.emergencyContact}
                    onChange={(e) => setContactInfo({ ...contactInfo, emergencyContact: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="hours">Working Hours</Label>
                  <Input
                    id="hours"
                    value={contactInfo.workingHours}
                    onChange={(e) => setContactInfo({ ...contactInfo, workingHours: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// FAQ Form Component
function FAQForm({ faq, onSave, onCancel }: any) {
  const [question, setQuestion] = useState(faq?.question || '');
  const [answer, setAnswer] = useState(faq?.answer || '');
  const [isActive, setIsActive] = useState(faq?.isActive ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ question, answer, isActive, order: faq?.order || 999 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="question">Question</Label>
        <Input
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter the question"
          required
        />
      </div>
      <div>
        <Label htmlFor="answer">Answer</Label>
        <Textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter the answer"
          rows={4}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch checked={isActive} onCheckedChange={setIsActive} />
        <Label>Active</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {faq ? 'Update FAQ' : 'Add FAQ'}
        </Button>
      </div>
    </form>
  );
}

// Banner Form Component
function BannerForm({ banner, onSave, onCancel }: any) {
  const [title, setTitle] = useState(banner?.title || '');
  const [description, setDescription] = useState(banner?.description || '');
  const [linkUrl, setLinkUrl] = useState(banner?.linkUrl || '');
  const [startDate, setStartDate] = useState(banner?.startDate || '');
  const [endDate, setEndDate] = useState(banner?.endDate || '');
  const [isActive, setIsActive] = useState(banner?.isActive ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ 
      title, 
      description, 
      linkUrl, 
      startDate, 
      endDate, 
      isActive,
      imageUrl: banner?.imageUrl || '/placeholder.jpg'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Banner Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter banner title"
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter banner description"
          rows={3}
          required
        />
      </div>
      <div>
        <Label htmlFor="linkUrl">Link URL</Label>
        <Input
          id="linkUrl"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          placeholder="Enter link URL"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch checked={isActive} onCheckedChange={setIsActive} />
        <Label>Active</Label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {banner ? 'Update Banner' : 'Add Banner'}
        </Button>
      </div>
    </form>
  );
}
