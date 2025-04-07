
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Coins, ShoppingCart, Star, Shield, ChevronsUp, Gift, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';

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
        border: 'border-yellow-400/30',
        bg: 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20',
        text: 'text-yellow-400',
        glow: 'shadow-yellow-400/20'
      };
    case 'epic':
      return {
        border: 'border-purple-400/30',
        bg: 'bg-gradient-to-br from-purple-400/20 to-pink-400/20',
        text: 'text-purple-400',
        glow: 'shadow-purple-400/20'
      };
    case 'rare':
      return {
        border: 'border-blue-400/30',
        bg: 'bg-gradient-to-br from-blue-400/20 to-cyan-400/20',
        text: 'text-blue-400',
        glow: 'shadow-blue-400/20'
      };
    default: // common
      return {
        border: 'border-gray-400/30',
        bg: 'bg-gradient-to-br from-gray-400/20 to-gray-600/20',
        text: 'text-gray-400',
        glow: 'shadow-gray-400/10'
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
  
  // Pagination for items
  const itemsPerPage = 6;
  const pages = Math.ceil(filteredItems.length / itemsPerPage);
  
  // Create item pages for tabbed view
  const itemPages = Array.from({ length: pages }).map((_, index) => {
    const start = index * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredItems.slice(start, end);
  });
    
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
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-changa bg-gradient-to-r from-game-primary to-game-accent bg-clip-text text-transparent">المتجر</h1>
          <p className="text-gray-400 mt-1">اشتر عناصر مميزة باستخدام العملات</p>
        </div>
        
        <div className="bg-gradient-to-br from-game-card-bg-alt to-game-card-bg px-5 py-3 rounded-xl flex items-center gap-2 border border-yellow-500/20 shadow-lg shadow-yellow-500/5">
          <Coins className="h-5 w-5 text-yellow-400 animate-pulse" />
          <span className="text-white font-bold font-share-tech text-xl">{user?.coins || 0}</span>
          <span className="text-gray-400">عملة</span>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="flex mb-4 bg-game-card-bg/50 rounded-lg p-1">
        <button
          className={`flex-1 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            selectedCategory === 'all' 
              ? 'bg-game-card-bg text-game-primary shadow-inner' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setSelectedCategory('all')}
        >
          <ShoppingCart className="h-4 w-4" />
          الكل
        </button>
        <button
          className={`flex-1 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            selectedCategory === 'avatars' 
              ? 'bg-game-card-bg text-game-primary shadow-inner' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setSelectedCategory('avatars')}
        >
          👤 الأفاتارات
        </button>
        <button
          className={`flex-1 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            selectedCategory === 'backgrounds' 
              ? 'bg-game-card-bg text-game-primary shadow-inner' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setSelectedCategory('backgrounds')}
        >
          🖼️ الخلفيات
        </button>
        <button
          className={`flex-1 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            selectedCategory === 'boosters' 
              ? 'bg-game-card-bg text-game-primary shadow-inner' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setSelectedCategory('boosters')}
        >
          ⚡ المعززات
        </button>
        <button
          className={`flex-1 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            selectedCategory === 'mystery' 
              ? 'bg-game-card-bg text-game-primary shadow-inner' 
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setSelectedCategory('mystery')}
        >
          🎁 صناديق
        </button>
      </div>
      
      {/* Shop Items Grid with Pagination */}
      <div className="flex-1 overflow-hidden">
        {filteredItems.length > 0 ? (
          <Tab.Group>
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <Tab.Panels className="h-full">
                  {itemPages.map((items, idx) => (
                    <Tab.Panel key={idx} className="h-full outline-none">
                      <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full"
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                      >
                        {items.map((item) => {
                          const rarityStyle = getRarityStyle(item.rarity);
                          return (
                            <motion.div 
                              key={item.id} 
                              variants={itemVariants}
                              className={`game-panel hover:border-game-primary transition-all duration-300 hover:shadow-lg ${rarityStyle.glow} overflow-hidden`}
                            >
                              <div className="text-center relative">
                                {/* Rarity corner label */}
                                {item.rarity && item.rarity !== 'common' && (
                                  <div className={`absolute top-0 right-0 px-3 py-1 ${rarityStyle.bg} ${rarityStyle.text} text-xs rounded-bl-lg border-b border-l ${rarityStyle.border} font-share-tech`}>
                                    {item.rarity === 'legendary' && <Sparkles className="h-3 w-3 inline mr-1" />}
                                    {item.rarity}
                                  </div>
                                )}
                                
                                <div className="flex justify-center items-center mb-4 mt-2">
                                  <div className={`h-20 w-20 ${rarityStyle.bg} rounded-xl flex items-center justify-center text-5xl border ${rarityStyle.border} shadow-lg`}>
                                    {item.image}
                                    {item.rarity === 'legendary' && (
                                      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent rounded-xl opacity-30 animate-pulse"></div>
                                    )}
                                  </div>
                                </div>
                                
                                <h3 className="font-semibold text-white mb-2 font-lexend">{item.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                                
                                {item.effect && (
                                  <div className={`text-xs ${rarityStyle.text} mb-4 py-1 px-2 rounded-md ${rarityStyle.bg} inline-block`}>
                                    {item.effect}
                                  </div>
                                )}
                                
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                                  <div className="flex items-center gap-1.5 py-1 px-3 bg-yellow-500/10 rounded-lg">
                                    <Coins className="h-4 w-4 text-yellow-400" />
                                    <span className="font-bold font-share-tech text-white">{item.price}</span>
                                  </div>
                                  
                                  <button
                                    onClick={() => handlePurchase(item)}
                                    className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all ${
                                      (user?.coins || 0) < item.price 
                                        ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-game-primary to-game-primary/70 text-white hover:shadow-md hover:shadow-game-primary/20'
                                    }`}
                                    disabled={(user?.coins || 0) < item.price}
                                  >
                                    <ShoppingCart className="h-4 w-4" />
                                    شراء
                                  </button>
                                </div>
                                
                                {(user?.coins || 0) < item.price && (
                                  <p className="text-red-400 text-xs mt-2">لا تملك عملات كافية</p>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </div>
              
              {itemPages.length > 1 && (
                <div className="flex justify-center space-x-1 py-4">
                  <Tab.List className="flex space-x-2">
                    {Array.from({ length: pages }).map((_, idx) => (
                      <Tab
                        key={idx}
                        className={({ selected }) =>
                          `rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                            selected
                              ? 'bg-game-primary text-white shadow-md shadow-game-primary/20'
                              : 'bg-game-card-bg-alt text-gray-400 hover:bg-gray-700 hover:text-white'
                          }`
                        }
                      >
                        {idx + 1}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
              )}
            </div>
          </Tab.Group>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-7xl mb-4 opacity-30">🛒</div>
              <p className="text-gray-400">لا توجد عناصر متاحة في هذه الفئة حالياً</p>
              <p className="text-gray-500 text-sm mt-2">تحقق من الفئات الأخرى أو عد لاحقاً</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Purchase Confirmation Modal */}
      {isConfirmingPurchase && selectedItem && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="game-panel max-w-md w-full animate-scale-in border-gradient">
            <div className="text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="h-24 w-24 bg-gradient-to-br from-game-card-bg-alt to-game-background rounded-xl flex items-center justify-center text-4xl border border-white/10 relative overflow-hidden">
                  {selectedItem.image}
                  <div className="absolute inset-0 bg-gradient-to-t from-game-primary/10 to-transparent"></div>
                </div>
              </div>
              
              <h3 className="font-semibold text-white text-xl mb-2 font-changa">تأكيد الشراء</h3>
              <p className="text-gray-400 text-sm mb-4 max-w-sm mx-auto">
                هل أنت متأكد من رغبتك في شراء {selectedItem.name} مقابل <span className="text-yellow-400 font-share-tech">{selectedItem.price}</span> عملة؟
              </p>
              
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={cancelPurchase}
                  className="px-5 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-white/5"
                >
                  إلغاء
                </button>
                
                <button
                  onClick={confirmPurchase}
                  className="px-5 py-2.5 bg-gradient-to-r from-game-primary to-game-primary/70 text-white rounded-lg hover:shadow-lg hover:shadow-game-primary/20 transition-all flex items-center gap-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  تأكيد الشراء
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
