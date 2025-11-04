import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { landingContent } from '@/lib/landing-content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useWaitlist } from '@/hooks/useWaitlist';
import confetti from 'canvas-confetti';
import { Check } from 'lucide-react';

export const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { finalCTA, footer } = landingContent;
  const { submitToWaitlist, isSubmitting } = useWaitlist();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: 'student' as 'student' | 'parent',
    school: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Animate progress bar based on scroll
  useState(() => {
    if (isInView) {
      setTimeout(() => setProgress(100), 300);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitToWaitlist(formData);
    
    if (success) {
      setSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FF4800', '#FFD700', '#FF6B35']
      });
      setFormData({ name: '', email: '', userType: 'student', school: '' });
    }
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A0500] to-[#000000]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,72,0,0.15),transparent_70%)]"></div>
      </div>

      {/* XP Progress Bar - Fills on scroll */}
      <motion.div
        className="fixed top-0 inset-x-0 h-2 bg-gradient-to-r from-[#FF4800] to-[#FFD700] z-50 shadow-lg shadow-[#FF4800]/50"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: progress / 100 } : {}}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{ transformOrigin: 'left' }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-['Changa'] font-bold mb-6">
            <span className="text-white">{finalCTA.headline.en}</span>
            <span className="block text-[#FF4800] mt-2 font-['Noto_Sans_Arabic']">
              {finalCTA.headline.ar}
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {finalCTA.subheadline.en}
          </p>
          <p className="text-lg text-white/60 font-['Noto_Sans_Arabic'] mt-2">
            {finalCTA.subheadline.ar}
          </p>
        </motion.div>

        {/* Waitlist Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="glass-card p-8 md:p-12 rounded-3xl border-2 border-[#FF4800]/30 relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF4800]/10 to-transparent"></div>

            {submitted ? (
              <motion.div
                className="relative text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FF4800] to-[#FFD700] flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 0.6 }}
                >
                  <Check className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-4 font-['Changa']">
                  {finalCTA.successMessage.en.split('!')[0]}!
                </h3>
                <p className="text-xl text-white/70 mb-2">
                  {finalCTA.successMessage.en.split('!')[1]}
                </p>
                <p className="text-lg text-[#FF4800] font-['Noto_Sans_Arabic']">
                  {finalCTA.successMessage.ar}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-white mb-2 block">
                    {finalCTA.formLabels.name.en} / {finalCTA.formLabels.name.ar}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/20 text-white"
                    placeholder="Ahmed / أحمد"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">
                    {finalCTA.formLabels.email.en} / {finalCTA.formLabels.email.ar}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/20 text-white"
                    placeholder="ahmed@example.com"
                  />
                </div>

                {/* User Type */}
                <div>
                  <Label className="text-white mb-3 block">
                    {finalCTA.formLabels.userType.en} / {finalCTA.formLabels.userType.ar}
                  </Label>
                  <RadioGroup
                    value={formData.userType}
                    onValueChange={(value) => setFormData({ ...formData, userType: value as 'student' | 'parent' })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2 glass-card px-4 py-3 rounded-xl flex-1">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student" className="text-white cursor-pointer">
                        {finalCTA.formLabels.student.en} / {finalCTA.formLabels.student.ar}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 glass-card px-4 py-3 rounded-xl flex-1">
                      <RadioGroupItem value="parent" id="parent" />
                      <Label htmlFor="parent" className="text-white cursor-pointer">
                        {finalCTA.formLabels.parent.en} / {finalCTA.formLabels.parent.ar}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* School (Optional) */}
                <div>
                  <Label htmlFor="school" className="text-white/70 mb-2 block text-sm">
                    {finalCTA.formLabels.school.en} / {finalCTA.formLabels.school.ar}
                  </Label>
                  <Input
                    id="school"
                    type="text"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="bg-white/5 border-white/20 text-white"
                    placeholder="Your School Name"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full glow-pulse text-lg py-6"
                >
                  {isSubmitting ? '⏳ Joining...' : `${finalCTA.formLabels.submit.en} / ${finalCTA.formLabels.submit.ar}`}
                </Button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <p className="text-white/60 mb-4">
            {footer.tagline.en}
          </p>
          <p className="text-white/50 font-['Noto_Sans_Arabic'] mb-6">
            {footer.tagline.ar}
          </p>

          <div className="flex justify-center gap-8 mb-8">
            {[
              { name: 'Instagram', icon: '📸' },
              { name: 'Facebook', icon: '👍' },
              { name: 'TikTok', icon: '🎵' },
              { name: 'YouTube', icon: '▶️' }
            ].map((social, i) => (
              <motion.a
                key={social.name}
                href="#"
                className="text-2xl hover:scale-125 transition-transform"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <div className="flex justify-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-[#FF4800] transition-colors">{footer.links.privacy.en}</a>
            <span>•</span>
            <a href="#" className="hover:text-[#FF4800] transition-colors">{footer.links.terms.en}</a>
            <span>•</span>
            <a href="#" className="hover:text-[#FF4800] transition-colors">{footer.links.contact.en}</a>
          </div>

          <p className="text-white/30 text-xs mt-6">
            © 2025 Darsni. All rights reserved.
          </p>
        </motion.footer>
      </div>
    </section>
  );
};
