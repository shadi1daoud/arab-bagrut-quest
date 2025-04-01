
import React, { useState } from 'react';
import { PixelButton } from '@/components/ui/pixel-button';
import { PixelProgress } from '@/components/ui/pixel-progress';
import { PixelBadge } from '@/components/ui/pixel-badge';
import { PixelCard, PixelCardHeader, PixelCardTitle, PixelCardContent, PixelCardFooter } from '@/components/ui/pixel-card';
import { PixelAvatar, PixelAvatarImage, PixelAvatarFallback } from '@/components/ui/pixel-avatar';
import { GameIcon } from '@/components/ui/game-icon';
import { Link } from 'react-router-dom';

const Index = () => {
  const [xp, setXp] = useState(75);
  
  const addXp = () => {
    setXp(prev => Math.min(prev + 5, 100));
  };

  return (
    <div className="min-h-screen bg-game-bg text-white p-4 md:p-8">
      {/* Header with pixel game style */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-minecraft text-game-accent mb-2 text-shadow-pixel">
          <span className="text-game-primary">دارسني</span> Darsni
        </h1>
        <p className="text-xl mb-6 font-minecraft text-white text-shadow-pixel">
          منصة تعليمية برؤية جديدة
        </p>
        
        {/* Animated sparkles */}
        <div className="relative inline-block">
          <div className="absolute -top-2 -left-2 animate-sparkle delay-100">
            <GameIcon type="sparkle" />
          </div>
          <div className="absolute top-0 -right-2 animate-sparkle delay-300">
            <GameIcon type="sparkle" />
          </div>
          <div className="absolute -bottom-2 left-2 animate-sparkle delay-500">
            <GameIcon type="sparkle" />
          </div>
          
          <PixelCard 
            className="inline-block px-6 py-3 bg-game-secondary border-2 border-game-border"
            glow={true}
          >
            <div className="font-minecraft">
              أهلاً بك في عالم التعلم الممتع
            </div>
          </PixelCard>
        </div>
      </header>
      
      {/* Main content - Game UI Showcase */}
      <div className="max-w-6xl mx-auto">
        {/* Player Stats Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Player Profile */}
          <PixelCard className="md:col-span-1 game-panel hover-scale" variant="primary" glow>
            <PixelCardHeader>
              <PixelCardTitle>بطاقة اللاعب</PixelCardTitle>
            </PixelCardHeader>
            <PixelCardContent className="flex flex-col items-center">
              <div className="mb-4 relative">
                <PixelAvatar className="h-24 w-24" variant="gold" glow>
                  <PixelAvatarImage src="/placeholder.svg" alt="Player Avatar" className="pixel-art" />
                  <PixelAvatarFallback>شا</PixelAvatarFallback>
                </PixelAvatar>
                <div className="absolute -top-2 -right-2">
                  <GameIcon type="level" size="sm" />
                </div>
              </div>
              <h3 className="text-lg font-minecraft mb-2">شادي داود</h3>
              <div className="flex gap-2 mb-3">
                <PixelBadge variant="gold">المستوى 3</PixelBadge>
                <PixelBadge variant="secondary">مبتدئ</PixelBadge>
              </div>
              <div className="w-full space-y-3">
                <div>
                  <div className="flex justify-between mb-1 text-xs">
                    <span>XP</span>
                    <span>{xp}/100</span>
                  </div>
                  <PixelProgress value={xp} max={100} variant="glow" color="green" />
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <GameIcon type="fire" size="sm" />
                    <span>20 يوم</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GameIcon type="coin" size="sm" />
                    <span>750</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GameIcon type="trophy" size="sm" />
                    <span>#3</span>
                  </div>
                </div>
              </div>
            </PixelCardContent>
          </PixelCard>
          
          {/* Game Features */}
          <div className="md:col-span-2 space-y-6">
            <PixelCard className="game-panel">
              <PixelCardHeader>
                <PixelCardTitle>ميزات اللعب</PixelCardTitle>
              </PixelCardHeader>
              <PixelCardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-game-secondary border-2 border-game-border">
                    <h4 className="font-minecraft text-game-accent mb-2">الكورسات كمراحل</h4>
                    <p className="text-sm mb-3">تعلم من خلال مراحل مثيرة تمنحك الخبرة والمكافآت</p>
                    <PixelProgress value={60} max={100} color="pink" variant="minecraft" height="sm" />
                  </div>
                  <div className="p-3 bg-game-secondary border-2 border-game-border">
                    <h4 className="font-minecraft text-game-accent mb-2">المتجر والجوائز</h4>
                    <p className="text-sm mb-3">اكسب العملات واشتري أفاتارات وخلفيات حصرية</p>
                    <div className="flex gap-2">
                      <GameIcon type="coin" />
                      <GameIcon type="coin" />
                      <GameIcon type="coin" />
                    </div>
                  </div>
                  <div className="p-3 bg-game-secondary border-2 border-game-border">
                    <h4 className="font-minecraft text-game-accent mb-2">المنافسة مع الأصدقاء</h4>
                    <p className="text-sm mb-3">تنافس مع أصدقائك واعتلي قمة قائمة المتصدرين</p>
                    <div className="flex gap-2">
                      <PixelBadge variant="gold">#1</PixelBadge>
                      <PixelBadge variant="secondary">#2</PixelBadge>
                      <PixelBadge variant="primary">#3</PixelBadge>
                    </div>
                  </div>
                  <div className="p-3 bg-game-secondary border-2 border-game-border">
                    <h4 className="font-minecraft text-game-accent mb-2">الشارات والانجازات</h4>
                    <p className="text-sm mb-3">اجمع الشارات المميزة وأكمل الإنجازات الخاصة</p>
                    <div className="flex gap-2">
                      <GameIcon type="star" />
                      <GameIcon type="trophy" />
                      <GameIcon type="heart" />
                    </div>
                  </div>
                </div>
              </PixelCardContent>
            </PixelCard>
            
            <div className="flex gap-4 flex-wrap justify-center">
              <PixelButton onClick={addXp}>
                اكسب خبرة +5 XP
              </PixelButton>
              <PixelButton variant="secondary">
                عرض الكورسات
              </PixelButton>
              <PixelButton variant="gold">
                تسوق الآن
              </PixelButton>
              <PixelButton variant="teal">
                المجتمع
              </PixelButton>
              <PixelButton variant="green">
                الإعدادات
              </PixelButton>
            </div>
          </div>
        </div>
        
        {/* Login/Demo Section */}
        <PixelCard className="game-panel max-w-md mx-auto text-center mt-12">
          <PixelCardHeader>
            <PixelCardTitle className="text-game-accent">ابدأ المغامرة الآن</PixelCardTitle>
          </PixelCardHeader>
          <PixelCardContent>
            <p className="mb-6 text-sm">
              انضم الآن للوصول إلى جميع الميزات وابدأ رحلة التعلم الخاصة بك!
            </p>
            <div className="flex flex-col gap-3 justify-center">
              <Link to="/login">
                <PixelButton className="w-full">
                  تسجيل الدخول
                </PixelButton>
              </Link>
              <Link to="/register">
                <PixelButton variant="secondary" className="w-full">
                  حساب جديد
                </PixelButton>
              </Link>
            </div>
          </PixelCardContent>
          <PixelCardFooter className="justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm">بواسطة</span>
              <span className="font-minecraft text-game-primary">Darsni دارسني</span>
            </div>
          </PixelCardFooter>
        </PixelCard>
      </div>
    </div>
  );
};

export default Index;
