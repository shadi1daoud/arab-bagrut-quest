
import React from 'react';
import { ShoppingBag, Star, Zap, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  featured: boolean;
}

interface StoreTeaserProps {
  featuredItems: StoreItem[];
  userCoins: number;
  onViewStore: () => void;
}

const StoreTeaser: React.FC<StoreTeaserProps> = ({ featuredItems, userCoins, onViewStore }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '#FFD700';
      case 'epic': return '#A335EE';
      case 'rare': return '#0070DD';
      default: return '#9D9D9D';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return <Crown className="w-3 h-3" />;
      case 'epic': return <Zap className="w-3 h-3" />;
      case 'rare': return <Star className="w-3 h-3" />;
      default: return <ShoppingBag className="w-3 h-3" />;
    }
  };

  return (
    <Card className="relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 right-2 w-20 h-20 bg-[#FFD700] rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-16 h-16 bg-[#A335EE] rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white font-changa">
            <ShoppingBag className="w-5 h-5 text-[#FF4800]" />
            متجر المكافآت
          </CardTitle>
          <div className="flex items-center gap-2 bg-[#FFD700]/10 px-3 py-1 rounded-full">
            <img 
              src="/lovable-uploads/0e8e99cc-9278-487b-a22d-d0558c2f11dc.png" 
              alt="Coins" 
              className="w-4 h-4"
            />
            <span className="text-sm font-bold text-[#FFD700] font-['Share_Tech_Mono']">
              {userCoins.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {featuredItems.slice(0, 2).map((item) => (
          <div 
            key={item.id}
            className="p-3 rounded-xl bg-black/20 border border-white/5 hover:border-white/10 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Rarity glow effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"
              style={{ 
                background: `linear-gradient(45deg, ${getRarityColor(item.rarity)}20, transparent)` 
              }}
            ></div>

            <div className="relative flex items-center gap-3">
              <div className="text-2xl">{item.icon}</div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-medium font-changa text-sm">
                    {item.name}
                  </h4>
                  <div 
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs"
                    style={{ 
                      backgroundColor: `${getRarityColor(item.rarity)}20`,
                      color: getRarityColor(item.rarity)
                    }}
                  >
                    {getRarityIcon(item.rarity)}
                    {item.rarity}
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 mb-2 font-noto">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <img 
                      src="/lovable-uploads/0e8e99cc-9278-487b-a22d-d0558c2f11dc.png" 
                      alt="Coins" 
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-bold text-[#FFD700] font-['Share_Tech_Mono']">
                      {item.price.toLocaleString()}
                    </span>
                  </div>

                  <Button 
                    size="sm"
                    disabled={userCoins < item.price}
                    className="h-7 px-3 text-xs bg-[#FF4800] hover:bg-[#CC3900] disabled:opacity-50"
                  >
                    شراء
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button 
          variant="outline" 
          className="w-full border-[#FF4800]/30 text-[#FF4800] hover:bg-[#FF4800]/10 text-sm h-10"
          onClick={onViewStore}
        >
          استكشف المتجر
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoreTeaser;
