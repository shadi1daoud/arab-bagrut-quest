
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Star, Shield, ChevronsUp, Gift, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Shop item types
type ItemCategory = 'avatars' | 'backgrounds' | 'boosters' | 'mystery';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: ItemCategory;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  effect?: string;
}

// Shop items data
const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'avatar-1',
    name: 'أفاتار الملك',
    description: 'أفاتار مميز بتاج ملكي',
    image: '👑',
    price: 200,
    category: 'avatars',
    rarity: 'epic',
  },
  {
    id: 'avatar-2',
    name: 'أفاتار النجم',
    description: 'أفاتار مميز بشكل نجمة',
    image: '⭐',
    price: 150,
    category: 'avatars',
    rarity: 'rare',
  },
  {
    id: 'avatar-3',
    name: 'أفاتار الذكي',
    description: 'أفاتار مميز بنظارة ذكية',
    image: '🤓',
    price: 100,
    category: 'avatars',
    rarity: 'common',
  },
  {
    id: 'bg-1',
    name: 'خلفية النجوم',
    description: 'خلفية فضائية مميزة للبروفايل',
    image: '🌌',
    price: 300,
    category: 'backgrounds',
    rarity: 'epic',
  },
  {
    id: 'bg-2',
    name: 'خلفية الجبال',
    description: 'خلفية طبيعية مميزة للبروفايل',
    image: '🏔️',
    price: 250,
    category: 'backgrounds',
    rarity: 'rare',
  },
  {
    id: 'booster-1',
    name: 'مضاعف XP',
    description: 'يضاعف نقاط الخبرة المكتسبة لمدة يوم',
    image: '⚡',
    price: 400,
    category: 'boosters',
    rarity: 'epic',
    effect: 'مضاعفة XP لمدة 24 ساعة',
  },
  {
    id: 'booster-2',
    name: 'معزز التقدم',
    description: 'تقدم أسرع في الكورسات لمدة ساعتين',
    image: '🚀',
    price: 350,
    category: 'boosters',
    rarity: 'rare',
    effect: 'تقدم مضاعف لمدة ساعتين',
  },
  {
    id: 'mystery-1',
    name: 'صندوق غامض',
    description: 'محتويات مفاجئة وعشوائية',
    image: '🎁',
    price: 500,
    category: 'mystery',
    rarity: 'legendary',
  },
];

const getRarityStyle = (rarity: string | undefined) => {
  switch(rarity) {
    case 'legendary':
      return {
        border: 'border-game-legendary/30',
        bg: 'bg-gradient-to-br from-game-legendary/20 to-game-legendary/10',
        text: 'text-game-legendary',
        glow: 'shadow-game-legendary/20'
      };
    case 'epic':
      return {
        border: 'border-game-epic/30',
        bg: 'bg-gradient-to-br from-game-epic/20 to-game-epic/10',
        text: 'text-game-epic',
        glow: 'shadow-game-epic/20'
      };
    case 'rare':
      return {
        border: 'border-game-rare/30',
        bg: 'bg-gradient-to-br from-game-rare/20 to-game-rare/10',
        text: 'text-game-rare',
        glow: 'shadow-game-rare/20'
      };
    default: // common
      return {
        border: 'border-game-common/30',
        bg: 'bg-gradient-to-br from-game-common/20 to-game-common/10',
        text: 'text-game-common',
        glow: 'shadow-game-common/10'
      };
  }
};

const Shop = () => {
  const { user, updateUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [isConfirmingPurchase, setIsConfirmingPurchase] = useState(false);
  const { toast } = useToast();
  
  // Filter items by category
  const filteredItems = selectedCategory === 'all' 
    ? SHOP_ITEMS 
    : SHOP_ITEMS.filter(item => item.category === selectedCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0 }
  };
    
  // Handle purchase
  const handlePurchase = (item: ShopItem) => {
    // Show confirmation dialog
    setSelectedItem(item);
    setIsConfirmingPurchase(true);
  };
  
  // Confirm purchase
  const confirmPurchase = () => {
    if (!selectedItem || !user) return;
    
    if ((user.coins || 0) < selectedItem.price) {
      toast({
        title: "عملية غير ناجحة",
        description: "لا تملك عملات كافية لهذا الشراء",
        variant: "destructive",
      });
      setIsConfirmingPurchase(false);
      return;
    }
    
    // Deduct coins
    updateUser({ 
      coins: (user.coins || 0) - selectedItem.price 
    });
    
    toast({
      title: "تم الشراء بنجاح!",
      description: `تمت إضافة ${selectedItem.name} إلى حسابك`,
    });
    
    setIsConfirmingPurchase(false);
  };
  
  // Cancel purchase
  const cancelPurchase = () => {
    setIsConfirmingPurchase(false);
    setSelectedItem(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center gap-2 mb-2">
        <div>
          <h1 className="text-xl font-bold text-white font-changa bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">المتجر</h1>
          <p className="text-game-foreground-muted text-xs">اشتر عناصر مميزة باستخدام العملات</p>
        </div>
        
        <div className="bg-gradient-to-br from-game-card-bg-alt to-game-card-bg px-4 py-1.5 rounded-xl flex items-center gap-1.5 border border-game-legendary/20 shadow-lg shadow-game-legendary/5">
          <img 
            src="/lovable-uploads/b01a3696-c05d-49eb-b8f2-6b1f7dcbeaab.png" 
            alt="Dbucks" 
            className="h-7 w-7 object-contain"
          />
          <span className="text-white font-bold font-share-tech">{user?.coins || 0}</span>
          <span className="text-game-foreground-muted text-sm">عملة</span>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="flex mb-2 bg-game-card-bg/50 rounded-lg p-1">
        <button
          className={`flex-1 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all text-sm ${
            selectedCategory === 'all' 
              ? 'bg-game-card-bg text-game-primary shadow-inner' 
              : 'text-game-foreground-muted hover:text-game-foreground'
          }`}
          onClick={() => setSelectedCategory('all')}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          الكل
        </button>
        <button
          className={`flex-1 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all text-sm ${
            selectedCategory === 'avatars' 
              ? 'bg-game-card-bg text-game-primary shadow-inner' 
              : 'text-game-foreground-muted hover:text-game-foreground'
          }`}
          onClick={() => setSelectedCategory('avatars')}
        >
          👤 الأفاتارات
        </button>
        <button
          className={`flex-1 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all text-sm ${
            selectedCategory === 'backgrounds' 
              ? 'bg-game-card-bg text-game-primary shadow-inner' 
              : 'text-game-foreground-muted hover:text-game-foreground'
          }`}
          onClick={() => setSelectedCategory('backgrounds')}
        >
          🖼️ الخلفيات
        </button>
        <button
          className={`flex-1 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all text-sm ${
            selectedCategory === 'boosters' 
              ? 'bg-game-card-bg text-game-primary shadow-inner' 
              : 'text-game-foreground-muted hover:text-game-foreground'
          }`}
          onClick={() => setSelectedCategory('boosters')}
        >
          ⚡ المعززات
        </button>
        <button
          className={`flex-1 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all text-sm ${
            selectedCategory === 'mystery' 
              ? 'bg-game-card-bg text-game-primary shadow-inner' 
              : 'text-game-foreground-muted hover:text-game-foreground'
          }`}
          onClick={() => setSelectedCategory('mystery')}
        >
          🎁 صناديق
        </button>
      </div>
      
      {/* Shop Items Grid - wrapped in ScrollArea */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full pr-2">
          {filteredItems.length > 0 ? (
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pb-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {filteredItems.map((item) => {
                const rarityStyle = getRarityStyle(item.rarity);
                return (
                  <motion.div 
                    key={item.id} 
                    variants={itemVariants}
                    className={`bg-game-card-bg backdrop-blur-sm border border-game-card-border p-2 rounded-lg hover:border-game-primary transition-all duration-300 hover:shadow-lg ${rarityStyle.glow}`}
                  >
                    <div className="text-center relative">
                      {/* Rarity corner label */}
                      {item.rarity && item.rarity !== 'common' && (
                        <div className={`absolute top-0 right-0 px-1.5 py-0.5 ${rarityStyle.bg} ${rarityStyle.text} text-xs rounded-bl-lg border-b border-l ${rarityStyle.border} font-share-tech`}>
                          {item.rarity === 'legendary' && <Sparkles className="h-2.5 w-2.5 inline mr-0.5" />}
                          {item.rarity}
                        </div>
                      )}
                      
                      <div className="flex justify-center items-center mb-2 mt-1">
                        <div className={`h-12 w-12 ${rarityStyle.bg} rounded-lg flex items-center justify-center text-3xl border ${rarityStyle.border}`}>
                          {item.image}
                          {item.rarity === 'legendary' && (
                            <div className="absolute inset-0 bg-gradient-to-t from-game-legendary/20 to-transparent rounded-lg opacity-30 animate-pulse"></div>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-game-foreground text-sm mb-1 font-lexend">{item.name}</h3>
                      <p className="text-game-foreground-muted text-xs mb-2 line-clamp-1">{item.description}</p>
                      
                      {item.effect && (
                        <div className={`text-xs ${rarityStyle.text} mb-2 py-0.5 px-1.5 rounded-md ${rarityStyle.bg} inline-block`}>
                          {item.effect}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-1 py-0.5 px-2 bg-game-legendary/10 rounded">
                          <img 
                            src="/lovable-uploads/b01a3696-c05d-49eb-b8f2-6b1f7dcbeaab.png" 
                            alt="Dbucks" 
                            className="h-5 w-5 object-contain"
                          />
                          <span className="font-bold font-share-tech text-white text-xs">{item.price}</span>
                        </div>
                        
                        <button
                          onClick={() => handlePurchase(item)}
                          className={`px-2 py-1 rounded flex items-center gap-1 transition-all text-xs ${
                            (user?.coins || 0) < item.price 
                              ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-game-primary to-game-secondary text-white hover:shadow-md hover:shadow-game-primary/20'
                          }`}
                          disabled={(user?.coins || 0) < item.price}
                        >
                          <ShoppingCart className="h-3 w-3" />
                          شراء
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-5xl mb-3 opacity-30">🛒</div>
                <p className="text-game-foreground-muted text-sm">لا توجد عناصر متاحة في هذه الفئة حالياً</p>
                <p className="text-gray-500 text-xs mt-1">تحقق من الفئات الأخرى أو عد لاحقاً</p>
              </div>
            </div>
          )}
        </ScrollArea>
      </div>
      
      {/* Purchase Confirmation Modal */}
      {isConfirmingPurchase && selectedItem && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-game-card-bg backdrop-blur-xl border border-game-card-border rounded-xl shadow-xl max-w-xs w-full animate-scale-in">
            <div className="text-center p-4">
              <div className="flex justify-center items-center mb-3">
                <div className="h-16 w-16 bg-gradient-to-br from-game-card-bg-alt to-game-background rounded-lg flex items-center justify-center text-3xl border border-white/10 relative overflow-hidden">
                  {selectedItem.image}
                  <div className="absolute inset-0 bg-gradient-to-t from-game-primary/10 to-transparent"></div>
                </div>
              </div>
              
              <h3 className="font-semibold text-game-foreground text-lg mb-2 font-changa">تأكيد الشراء</h3>
              <p className="text-game-foreground-muted text-sm mb-3">
                هل أنت متأكد من رغبتك في شراء {selectedItem.name} مقابل 
                <span className="inline-flex items-center ml-1 mr-1">
                  <img 
                    src="/lovable-uploads/b01a3696-c05d-49eb-b8f2-6b1f7dcbeaab.png" 
                    alt="Dbucks" 
                    className="h-5 w-5 object-contain mr-1" 
                  />
                  <span className="text-game-legendary font-share-tech">{selectedItem.price}</span>
                </span> 
                عملة؟
              </p>
              
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={cancelPurchase}
                  className="px-4 py-2 bg-game-card-bg-alt text-game-foreground rounded-lg hover:bg-game-card-bg-hover transition-colors border border-white/5 text-sm"
                >
                  إلغاء
                </button>
                
                <button
                  onClick={confirmPurchase}
                  className="px-4 py-2 bg-gradient-to-r from-game-primary to-game-secondary text-white rounded-lg hover:shadow-lg hover:shadow-game-primary/20 transition-all flex items-center gap-2 text-sm"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  تأكيد
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
