import React, { useState, useEffect } from 'react';
import { ShoppingCart, Coins, Gift, Zap, Brain, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { getShopItems, getUserInventory, ShopItem } from '@/lib/firebaseUtils';

const Shop = () => {
  const { user } = useAuth();
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [userInventory, setUserInventory] = useState<Array<{ itemId: string; quantity: number }>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Fetch shop data
  useEffect(() => {
    const fetchShopData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Fetch shop items
        const items = await getShopItems();
        setShopItems(items);

        // Fetch user inventory
        const inventory = await getUserInventory(user.id);
        setUserInventory(inventory);

      } catch (error) {
        console.error('Error fetching shop data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [user]);

  // Filter items by category
  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(shopItems.map(item => item.category)))];

  // Mock user coins (this should come from user profile)
  const userCoins = 1250;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">جاري التحميل...</div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'boosters':
        return <Zap className="h-5 w-5" />;
      case 'study':
        return <Brain className="h-5 w-5" />;
      case 'ai':
        return <Star className="h-5 w-5" />;
      case 'mystery':
        return <Gift className="h-5 w-5" />;
      case 'dbucks':
        return <Coins className="h-5 w-5" />;
      default:
        return <ShoppingCart className="h-5 w-5" />;
    }
  };

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'legendary':
        return 'text-yellow-400 border-yellow-400/30';
      case 'epic':
        return 'text-purple-400 border-purple-400/30';
      case 'rare':
        return 'text-blue-400 border-blue-400/30';
      case 'common':
        return 'text-gray-400 border-gray-400/30';
      default:
        return 'text-gray-400 border-gray-400/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">متجر العناصر</h1>
          <p className="text-gray-400">اشتر عناصر لتحسين تجربة التعلم</p>
        </div>
        <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3 border border-white/10">
          <Coins className="h-5 w-5 text-yellow-400" />
          <span className="text-white font-bold">{userCoins}</span>
          <span className="text-gray-400 text-sm">عملة</span>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {getCategoryIcon(category)}
            <span className="mr-2">
              {category === 'all' ? 'الكل' : 
               category === 'boosters' ? 'معززات' :
               category === 'study' ? 'دراسة' :
               category === 'ai' ? 'ذكاء اصطناعي' :
               category === 'mystery' ? 'مفاجآت' :
               category === 'dbucks' ? 'عملات' : category}
            </span>
          </Button>
        ))}
      </div>

      {/* Shop Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const userItem = userInventory.find(inv => inv.itemId === item.id);
          const userQuantity = userItem?.quantity || 0;

          return (
            <Card key={item.id} className="bg-black/40 border border-white/10 hover:border-[#FF4800]/30 transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#FF4800]/10 flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg group-hover:text-[#FF4800] transition-colors">
                        {item.name}
                      </CardTitle>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                  {item.rarity && (
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getRarityColor(item.rarity)}`}
                    >
                      {item.rarity === 'legendary' ? 'أسطوري' :
                       item.rarity === 'epic' ? 'ملحمي' :
                       item.rarity === 'rare' ? 'نادر' :
                       item.rarity === 'common' ? 'شائع' : item.rarity}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {item.effect && (
                  <div className="text-sm text-gray-300 bg-black/20 rounded-lg p-3">
                    <span className="text-[#FF4800] font-medium">التأثير:</span> {item.effect}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-bold">{item.price}</span>
                  </div>
                  
                  {userQuantity > 0 && (
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <span>المملوك:</span>
                      <span className="text-[#FF4800] font-bold">{userQuantity}</span>
                    </div>
                  )}
                </div>
                
                {item.limitedTime && item.timeRemaining && (
                  <div className="flex items-center gap-2 text-sm text-red-400">
                    <Clock className="h-4 w-4" />
                    <span>متبقي: {item.timeRemaining} ساعة</span>
                  </div>
                )}
                
                <Button 
                  className="w-full bg-[#FF4800] hover:bg-[#FF4800]/90"
                  disabled={userCoins < item.price}
                >
                  {userCoins < item.price ? 'عملات غير كافية' : 'شراء'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">لا توجد عناصر</h3>
          <p className="text-gray-400 mb-4">
            {selectedCategory !== 'all' 
              ? 'لا توجد عناصر في هذه الفئة' 
              : 'لا توجد عناصر متاحة حالياً'
            }
          </p>
          {selectedCategory !== 'all' && (
            <Button 
              variant="outline" 
              onClick={() => setSelectedCategory('all')}
            >
              عرض جميع العناصر
            </Button>
          )}
        </div>
      )}

      {/* User Inventory */}
      {userInventory.length > 0 && (
        <Card className="bg-black/40 border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">المخزون الشخصي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {userInventory.map((invItem) => {
                const item = shopItems.find(shopItem => shopItem.id === invItem.itemId);
                if (!item) return null;

                return (
                  <div key={invItem.itemId} className="text-center p-3 bg-black/20 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-8 h-8 mx-auto mb-2 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <p className="text-white text-sm mb-1">{item.name}</p>
                    <p className="text-[#FF4800] font-bold">{invItem.quantity}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Shop;
