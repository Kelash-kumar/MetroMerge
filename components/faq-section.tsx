"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FaqSection() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight">FAQs related to Bus Tickets Booking</h2>
          <p className="text-muted-foreground">
            Find answers to commonly asked questions about booking bus tickets with MetroMerge
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="ticket">Ticket-related</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="cancellation">Cancellation & Refund</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Can I track the location of my booked bus online?</AccordionTrigger>
                  <AccordionContent>
                    Yes, MetroMerge offers a live bus tracking feature that allows you to track the real-time location
                    of your bus. This feature is available through our mobile app and website once your booking is
                    confirmed.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    What are the advantages of purchasing a bus ticket with MetroMerge?
                  </AccordionTrigger>
                  <AccordionContent>
                    MetroMerge offers numerous advantages including comparing prices across multiple operators,
                    exclusive discounts, secure payment options, live bus tracking, m-tickets for paperless travel, 24/7
                    customer support, and a user-friendly booking experience.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Why book bus tickets online on MetroMerge?</AccordionTrigger>
                  <AccordionContent>
                    Booking bus tickets online with MetroMerge saves time, offers better prices through exclusive deals,
                    provides more choices with 2,500+ bus operators, allows you to select your preferred seat, and gives
                    you the convenience of booking from anywhere at any time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Do I need to create an account on the MetroMerge site to book my bus ticket?
                  </AccordionTrigger>
                  <AccordionContent>
                    While creating an account is recommended for a better experience and to access your booking history,
                    MetroMerge also offers a guest checkout option. However, having an account makes future bookings
                    faster and allows you to earn loyalty rewards.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="ticket" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I receive my bus ticket after booking?</AccordionTrigger>
                  <AccordionContent>
                    After booking, your e-ticket will be sent to your email address and mobile number via SMS. You can
                    also download the m-ticket from the MetroMerge app or website by logging into your account and
                    accessing your booking history.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I book a ticket for someone else?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can book tickets for friends and family. During the booking process, you'll need to provide
                    the passenger's name and age. The ticket will be issued in their name, but the booking confirmation
                    will be sent to your contact details.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How far in advance can I book a bus ticket?</AccordionTrigger>
                  <AccordionContent>
                    Most bus operators on MetroMerge allow bookings up to 90 days in advance, depending on their
                    schedule availability. For popular routes and during peak seasons, we recommend booking at least 2-3
                    weeks in advance to secure your preferred seats.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="payment" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What payment methods are accepted on MetroMerge?</AccordionTrigger>
                  <AccordionContent>
                    MetroMerge accepts various payment methods including credit/debit cards, net banking, UPI, digital
                    wallets, and EMI options. All payment gateways are secure and protected with industry-standard
                    encryption.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it safe to make payments on MetroMerge?</AccordionTrigger>
                  <AccordionContent>
                    Yes, all payments on MetroMerge are processed through secure payment gateways with industry-standard
                    encryption. We do not store your card details, and our platform is PCI-DSS compliant to ensure
                    maximum security for all transactions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I pay for my ticket in cash?</AccordionTrigger>
                  <AccordionContent>
                    MetroMerge is primarily an online booking platform, so most transactions are digital. However, in
                    select cities, we offer a cash on delivery option where you can pay in cash when the ticket is
                    delivered to your address (additional charges may apply).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="cancellation" className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I cancel my bus ticket?</AccordionTrigger>
                  <AccordionContent>
                    You can cancel your ticket through the MetroMerge website or app by going to "My Bookings,"
                    selecting the ticket you wish to cancel, and following the cancellation process. The refund amount
                    will depend on the cancellation policy of the bus operator and how far in advance you cancel.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is the refund policy for cancelled tickets?</AccordionTrigger>
                  <AccordionContent>
                    Refund policies vary by bus operator. Generally, cancellations made 24-48 hours before departure
                    receive 50-75% refund, while those made within 24 hours may receive 25-50% or no refund. The exact
                    refund amount will be shown during the cancellation process. MetroMerge processes refunds within 5-7
                    business days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I reschedule my journey instead of cancelling?</AccordionTrigger>
                  <AccordionContent>
                    Yes, MetroMerge offers a rescheduling option for most bus tickets. You can reschedule your journey
                    by going to "My Bookings" and selecting the reschedule option. Depending on the bus operator's
                    policy, a rescheduling fee may apply. This option is typically available up to 24 hours before
                    departure.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

