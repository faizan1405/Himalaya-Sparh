import { connectDB } from '@/lib/db/connection';
import Admin from '@/lib/models/Admin';
import SiteSettings from '@/lib/models/SiteSettings';
import HeroContent from '@/lib/models/HeroContent';
import AboutIntro from '@/lib/models/AboutIntro';
import Faq from '@/lib/models/Faq';

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Create default admin
    const bcrypt = await import('bcryptjs');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@himalyaspersh.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'change-this-password';

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.default.hash(adminPassword, 12);
      await Admin.create({ email: adminEmail, name: 'Admin', password: hashedPassword, role: 'super_admin' });
      console.log('✓ Admin user created:', adminEmail);
    } else {
      console.log('✓ Admin user already exists');
    }

    // Create default site settings
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      await SiteSettings.create({});
      console.log('✓ Default site settings created');
    }

    // Create default hero content
    const existingHero = await HeroContent.findOne();
    if (!existingHero) {
      await HeroContent.create({});
      console.log('✓ Default hero content created');
    }

    // Create default about intro
    const existingAbout = await AboutIntro.findOne();
    if (!existingAbout) {
      await AboutIntro.create({});
      console.log('✓ Default about content created');
    }

    // Create default FAQs
    const faqCount = await Faq.countDocuments();
    if (faqCount === 0) {
      const defaultFaqs = [
        { question: 'How long does the device last?', answer: 'With proper care and maintenance, the device is designed for long-term daily use.', category: 'Product', order: 1 },
        { question: 'Is electricity required?', answer: 'No, the device operates without electricity.', category: 'Product', order: 2 },
        { question: 'How do I place an order?', answer: 'Visit our Buy Now page and complete the checkout process. Or contact us directly.', category: 'Purchase', order: 3 },
        { question: 'What payment methods are accepted?', answer: 'Payment gateway integration is coming soon. Currently, contact us for purchase details.', category: 'Purchase', order: 4 },
        { question: 'Do you offer interstate delivery?', answer: 'Yes, our Founder Delivery service covers all states across India.', category: 'Delivery', order: 5 },
      ];
      await Faq.insertMany(defaultFaqs);
      console.log('✓ Default FAQs created');
    }

    console.log('\n✅ Seed completed successfully!');
    console.log('\nLogin credentials:');
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
