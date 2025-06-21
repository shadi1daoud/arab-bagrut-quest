import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ShoppingCart, Gift, Star, 
  Rocket, Award, Package, 
  BookOpen, Diamond, CircleDollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

// Shop item types
type ItemCategory = 'boosters' | 'study' | 'ai' | 'mystery' | 'dbucks';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: ItemCategory;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  effect?: string;
  limitedTime?: boolean;
  timeRemaining?: number; // in hours
}

// Extended shop items data with new categories
const SHOP_ITEMS: ShopItem[] = [
  // Boosters
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
    id: 'booster-3',
    name: 'درع الحماية',
    description: 'احمِ تتابعك اليومي من الانقطاع ليوم واحد',
    image: '🛡️',
    price: 200,
    category: 'boosters',
    rarity: 'common',
    effect: 'حماية التتابع اليومي',
  },
  
  // Study perks
  {
    id: 'study-1',
    name: 'ملخص الدرس',
    description: 'الحصول على ملخص ذكي لأي درس',
    image: '📚',
    price: 250,
    category: 'study',
    rarity: 'rare',
    effect: '3 ملخصات متاحة',
  },
  {
    id: 'study-2',
    name: 'جلسة تركيز',
    description: 'وضع التركيز المميز مع موسيقى هادئة',
    image: '🧠',
    price: 150,
    category: 'study',
    rarity: 'common',
  },
  {
    id: 'study-3',
    name: 'فتح محتوى متميز',
    description: 'الوصول إلى مواد إضافية متميزة',
    image: '🔐',
    price: 500,
    category: 'study',
    rarity: 'epic',
    limitedTime: true,
    timeRemaining: 48,
  },
  
  // AI Tools
  {
    id: 'ai-1',
    name: 'مساعد الرياضيات',
    description: 'حل المسائل الرياضية بخطوات مفصلة',
    image: '🤖',
    price: 600,
    category: 'ai',
    rarity: 'epic',
    effect: '10 مسائل في اليوم',
  },
  {
    id: 'ai-2',
    name: 'مصحح اللغة',
    description: 'تصحيح أخطاء اللغة في كتاباتك',
    image: '📝',
    price: 300,
    category: 'ai',
    rarity: 'rare',
  },
  {
    id: 'ai-3',
    name: 'اقتراحات مخصصة',
    description: 'اقتراحات تعلم ذكية بناءً على أدائك',
    image: '💡',
    price: 450,
    category: 'ai',
    rarity: 'rare',
  },
  
  // Mystery & Fun
  {
    id: 'mystery-1',
    name: 'صندوق غامض',
    description: 'محتويات مفاجئة وعشوائية',
    image: '🎁',
    price: 500,
    category: 'mystery',
    rarity: 'legendary',
  },
  {
    id: 'mystery-2',
    name: 'لغز التحدي اليومي',
    description: 'تحديات يومية مع مكافآت مضاعفة',
    image: '🧩',
    price: 200,
    category: 'mystery',
    rarity: 'common',
    limitedTime: true,
    timeRemaining: 24,
  },
  {
    id: 'mystery-3',
    name: 'طابع نادر',
    description: 'طابع مميز لملفك الشخصي',
    image: '🏆',
    price: 350,
    category: 'mystery',
    rarity: 'rare',
  },
  
  // Buy Dbucks
  {
    id: 'dbucks-1',
    name: '500 عملة',
    description: 'عملات افتراضية للمتجر',
    image: '💰',
    price: 0,
    category: 'dbucks',
    effect: 'إضافة 500 عملة إلى رصيدك',
  },
  {
    id: 'dbucks-2',
    name: '1200 عملة',
    description: 'عملات افتراضية للمتجر + 100 مجاناً',
    image: '💰',
    price: 0,
    category: 'dbucks',
    effect: 'إضافة 1300 عملة إلى رصيدك',
  },
  {
    id: 'dbucks-3',
    name: '2500 عملة',
    description: 'عملات افتراضية للمتجر + 500 مجاناً',
    image: '💰',
    price: 0,
    category: 'dbucks',
    effect: 'إضافة 3000 عملة إلى رصيدك',
    rarity: 'epic',
  },
];

const getRarityStyle = (rarity: string | undefined) => {
  switch(rarity) {
    case 'legendary':
      return {
        border: 'border-game-legendary/80',
        bg: 'from-game-legendary/20 to-game-legendary/5',
        text: 'text-game-legendary',
        glow: 'shadow-[0_0_15px_rgba(255,215,0,0.3)]',
        bgGradient: 'linear-gradient(180deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.05) 100%)'
      };
    case 'epic':
      return {
        border: 'border-game-epic/80',
        bg: 'from-game-epic/20 to-game-epic/5',
        text: 'text-game-epic',
        glow: 'shadow-[0_0_15px_rgba(163,53,238,0.3)]',
        bgGradient: 'linear-gradient(180deg, rgba(163,53,238,0.2) 0%, rgba(163,53,238,0.05) 100%)'
      };
    case 'rare':
      return {
        border: 'border-game-rare/80',
        bg: 'from-game-rare/20 to-game-rare/5',
        text: 'text-game-rare',
        glow: 'shadow-[0_0_15px_rgba(0,112,221,0.3)]',
        bgGradient: 'linear-gradient(180deg, rgba(0,112,221,0.2) 0%, rgba(0,112,221,0.05) 100%)'
      };
    default: // common
      return {
        border: 'border-game-common/80',
        bg: 'from-game-common/20 to-game-common/5',
        text: 'text-gray-200',
        glow: 'shadow-[0_0_10px_rgba(157,157,157,0.2)]',
        bgGradient: 'linear-gradient(180deg, rgba(157,157,157,0.15) 0%, rgba(157,157,157,0.05) 100%)'
      };
  }
};

const Shop = () => {
  const { user, updateUser } = useAuth();
  const [selectedTab, setSelectedTab] = useState<string>('boosters');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [isConfirmingPurchase, setIsConfirmingPurchase] = useState(false);
  const [isBoxOpening, setIsBoxOpening] = useState(false);
  const [boxReward, setBoxReward] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Get filtered items based on selected tab
  const filteredItems = SHOP_ITEMS.filter(item => 
    selectedTab === 'all' ? true : item.category === selectedTab
  );

  // Get featured items (limited time offers)
  const featuredItems = SHOP_ITEMS.filter(item => item.limitedTime);
  
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  const tabIndicatorVariants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: '100%' }
  };
  
  // Handle card tilt effect
  const cardTiltEffect = {
    rest: { 
      scale: 1,
      rotateY: 0, 
      rotateX: 0, 
      rotate: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    hover: { 
      scale: 1.05,
      rotateY: 5, 
      rotateX: -5, 
      rotate: -1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
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
    
    // For mystery boxes, show opening animation
    if (selectedItem.category === 'mystery' && selectedItem.id === 'mystery-1') {
      setIsConfirmingPurchase(false);
      
      if ((user.coins || 0) < selectedItem.price) {
        toast({
          title: "عملية غير ناجحة",
          description: "لا تملك عملات كافية لهذا الشراء",
          variant: "destructive",
        });
        return;
      }
      
      // Deduct coins
      updateUser({ 
        coins: (user.coins || 0) - selectedItem.price 
      });
      
      // Start box opening animation
      setIsBoxOpening(true);
      
      // Generate random reward
      const rewards = ["5000 XP", "200 عملة", "مضاعف XP", "طابع نادر", "ملصق مميز"];
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      
      // Show reward after delay
      setTimeout(() => {
        setBoxReward(randomReward);
      }, 3000);
      
      return;
    }
    
    if ((user.coins || 0) < selectedItem.price) {
      toast({
        title: "عملية غير ناجحة",
        description: "لا تملك عملات كافية لهذا الشراء",
        variant: "destructive",
      });
      setIsConfirmingPurchase(false);
      return;
    }
    
    // For Dbucks purchases (special handling)
    if (selectedItem.category === 'dbucks') {
      // Simulate adding coins (in real app would connect to payment system)
      let coinsToAdd = 0;
      
      if (selectedItem.id === 'dbucks-1') coinsToAdd = 500;
      else if (selectedItem.id === 'dbucks-2') coinsToAdd = 1300;
      else if (selectedItem.id === 'dbucks-3') coinsToAdd = 3000;
      
      updateUser({ 
        coins: (user.coins || 0) + coinsToAdd 
      });
      
      toast({
        title: "تم الشراء بنجاح!",
        description: `تمت إضافة ${coinsToAdd} عملة إلى رصيدك`,
      });
      
      setIsConfirmingPurchase(false);
      return;
    }
    
    // Regular purchase
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
  
  // Close mystery box result
  const closeMysteryBox = () => {
    setIsBoxOpening(false);
    setBoxReward(null);
  };
  
  // Format time remaining
  const formatTimeRemaining = (hours: number) => {
    if (hours < 1) return "أقل من ساعة";
    return `${hours} ساعة`;
  };

  // Icon map for categories
  const getCategoryIcon = (category: ItemCategory) => {
    switch(category) {
      case 'boosters': return <Rocket className="h-5 w-5" />;
      case 'study': return <BookOpen className="h-5 w-5" />;
      case 'ai': return <Package className="h-5 w-5" />;
      case 'mystery': return <Gift className="h-5 w-5" />;
      case 'dbucks': return <CircleDollarSign className="h-5 w-5" />;
      default: return <ShoppingCart className="h-5 w-5" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header - simplified without balance display */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-game-primary via-game-accent to-game-secondary bg-clip-text text-transparent font-['Changa']">
          المتجر
        </h1>
        <p className="text-game-foreground-muted text-sm font-['Noto_Sans_Arabic']">
          اشترِ عناصر مميزة واستخدمها في رحلتك التعليمية
        </p>
      </div>
      
      {/* Featured items (limited time offers) */}
      {featuredItems.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 font-['Changa'] flex items-center gap-2 text-white">
            <Award className="h-5 w-5 text-game-legendary" /> عروض محدودة
          </h2>
          
          <ScrollArea className="pb-2">
            <div className="flex gap-2 pb-2">
              {featuredItems.map(item => (
                <motion.div
                  key={`featured-${item.id}`}
                  className="relative w-[200px] min-w-[200px]"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card rarity={item.rarity} className="h-[280px] group">
                    {/* Limited time indicator */}
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-game-primary/90 text-xs text-white rounded z-20 flex items-center gap-1 font-['Share_Tech_Mono']">
                      <span className="animate-pulse">⏱️</span>
                      <span>{formatTimeRemaining(item.timeRemaining || 0)}</span>
                    </div>
                    
                    {/* Card content */}
                    <div className="flex flex-col h-full">
                      <CardContent className="flex-1 flex items-center justify-center p-3">
                        <div className="text-7xl transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                          {item.image}
                        </div>
                        
                        {/* Effect tag if present */}
                        {item.effect && (
                          <div className="absolute bottom-16 left-2 bg-black/70 px-2 py-0.5 text-xs rounded text-white border border-white/20 z-20">
                            {item.effect.length > 12 ? `${item.effect.substring(0, 10)}...` : item.effect}
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="justify-between flex items-center">
                        <CardTitle className="text-sm max-w-[120px] font-['Changa']">
                          {item.name}
                        </CardTitle>
                        
                        <div className="flex items-center gap-0.5">
                          <img 
                            src="/lovable-uploads/b01a3696-c05d-49eb-b8f2-6b1f7dcbeaab.png" 
                            alt="Dbucks" 
                            className="h-5 w-5 object-contain"
                          />
                          <span className="font-bold text-white font-['Share_Tech_Mono'] text-sm">
                            {item.price}
                          </span>
                        </div>
                      </CardFooter>
                    </div>
                    
                    {/* Purchase overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-30">
                      <Button
                        onClick={() => handlePurchase(item)}
                        disabled={(user?.coins || 0) < item.price}
                        className="bg-game-primary hover:bg-game-secondary text-white font-['Noto_Sans_Arabic'] px-4"
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        شراء الآن
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      
      {/* Category Tabs */}
      <Tabs 
        defaultValue="boosters" 
        className="w-full" 
        onValueChange={setSelectedTab}
      >
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-1 mb-3 border border-white/5 overflow-auto">
          <TabsList className="w-full bg-transparent gap-1 h-auto p-1">
            <TabsTrigger 
              value="boosters"
              className="flex-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-game-primary/20 data-[state=active]:to-game-secondary/5 data-[state=active]:text-white data-[state=active]:border-game-primary/30 rounded-lg border border-transparent data-[state=active]:shadow-inner py-2 relative group"
            >
              <div className="flex items-center justify-center gap-2">
                <Rocket className="h-4 w-4" />
                <span className="font-['Noto_Sans_Arabic']">المعززات</span>
              </div>
              {selectedTab === 'boosters' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-game-primary"
                  variants={tabIndicatorVariants}
                  initial="hidden"
                  animate="visible"
                  layoutId="tabIndicator"
                />
              )}
            </TabsTrigger>
            
            <TabsTrigger 
              value="study"
              className="flex-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-game-primary/20 data-[state=active]:to-game-secondary/5 data-[state=active]:text-white data-[state=active]:border-game-primary/30 rounded-lg border border-transparent data-[state=active]:shadow-inner py-2 relative group"
            >
              <div className="flex items-center justify-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="font-['Noto_Sans_Arabic']">أدوات الدراسة</span>
              </div>
              {selectedTab === 'study' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-game-primary" 
                  variants={tabIndicatorVariants}
                  initial="hidden"
                  animate="visible"
                  layoutId="tabIndicator"
                />
              )}
            </TabsTrigger>
            
            <TabsTrigger 
              value="ai"
              className="flex-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-game-primary/20 data-[state=active]:to-game-secondary/5 data-[state=active]:text-white data-[state=active]:border-game-primary/30 rounded-lg border border-transparent data-[state=active]:shadow-inner py-2 relative group"
            >
              <div className="flex items-center justify-center gap-2">
                <Package className="h-4 w-4" />
                <span className="font-['Noto_Sans_Arabic']">أدوات الذكاء</span>
              </div>
              {selectedTab === 'ai' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-game-primary" 
                  variants={tabIndicatorVariants}
                  initial="hidden"
                  animate="visible"
                  layoutId="tabIndicator"
                />
              )}
            </TabsTrigger>
            
            <TabsTrigger 
              value="mystery"
              className="flex-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-game-primary/20 data-[state=active]:to-game-secondary/5 data-[state=active]:text-white data-[state=active]:border-game-primary/30 rounded-lg border border-transparent data-[state=active]:shadow-inner py-2 relative group"
            >
              <div className="flex items-center justify-center gap-2">
                <Gift className="h-4 w-4" />
                <span className="font-['Noto_Sans_Arabic']">صناديق المفاجآت</span>
              </div>
              {selectedTab === 'mystery' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-game-primary" 
                  variants={tabIndicatorVariants}
                  initial="hidden"
                  animate="visible"
                  layoutId="tabIndicator"
                />
              )}
            </TabsTrigger>
            
            <TabsTrigger 
              value="dbucks"
              className="flex-1 data-[state=active]:bg-gradient-to-br data-[state=active]:from-game-primary/20 data-[state=active]:to-game-secondary/5 data-[state=active]:text-white data-[state=active]:border-game-primary/30 rounded-lg border border-transparent data-[state=active]:shadow-inner py-2 relative group"
            >
              <div className="flex items-center justify-center gap-2">
                <CircleDollarSign className="h-4 w-4" />
                <span className="font-['Noto_Sans_Arabic']">شراء العملات</span>
              </div>
              {selectedTab === 'dbucks' && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-game-primary" 
                  variants={tabIndicatorVariants}
                  initial="hidden"
                  animate="visible"
                  layoutId="tabIndicator"
                />
              )}
            </TabsTrigger>
          </TabsList>
        </div>
        
        {/* Tab Content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <TabsContent 
              key={selectedTab}
              value={selectedTab}
              className="h-full mt-0"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <ScrollArea className="h-full w-full pr-2">
                  {filteredItems.length > 0 ? (
                    <motion.div 
                      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 pb-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="show"
                    >
                      {filteredItems.map((item) => (
                        <motion.div
                          key={item.id}
                          variants={itemVariants}
                          className="h-[280px] relative"
                        >
                          <Card rarity={item.rarity} className="h-full group">
                            {/* Rarity corner label */}
                            {item.rarity && item.rarity !== 'common' && (
                              <div className={`absolute top-2 right-2 px-1.5 py-0.5 bg-black/70 text-${getRarityTextColor(item.rarity)} text-xs rounded z-20 flex items-center gap-1`}>
                                <Star className="h-3 w-3" />
                                {item.rarity}
                              </div>
                            )}
                            
                            <div className="flex flex-col h-full">
                              <CardContent className="flex-1 flex items-center justify-center">
                                <div className="text-7xl transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">
                                  {item.image}
                                </div>
                                
                                {/* Effect tag if present */}
                                {item.effect && (
                                  <div className="absolute bottom-16 left-2 bg-black/70 px-2 py-0.5 text-xs rounded text-white border border-white/20 z-20">
                                    {item.effect.length > 12 ? `${item.effect.substring(0, 10)}...` : item.effect}
                                  </div>
                                )}
                              </CardContent>
                              
                              <CardFooter>
                                <CardTitle className="text-sm max-w-[120px]">
                                  {item.name}
                                </CardTitle>
                                
                                <div className="flex items-center gap-0.5">
                                  <img 
                                    src="/lovable-uploads/b01a3696-c05d-49eb-b8f2-6b1f7dcbeaab.png" 
                                    alt="Dbucks" 
                                    className="h-5 w-5 object-contain"
                                  />
                                  <span className="font-bold text-white font-['Share_Tech_Mono'] text-sm">
                                    {item.price}
                                  </span>
                                </div>
                              </CardFooter>
                            </div>
                            
                            {/* Purchase overlay on hover */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-30">
                              <Button
                                onClick={() => handlePurchase(item)}
                                disabled={(user?.coins || 0) < item.price}
                                className="bg-game-primary hover:bg-game-secondary text-white font-['Noto_Sans_Arabic'] px-4"
                              >
                                <ShoppingCart className="h-4 w-4 mr-1" />
                                شراء الآن
                              </Button>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-game-foreground-muted">
                      <div className="text-5xl mb-4">😿</div>
                      <p className="font-['Noto_Sans_Arabic']">لا توجد عناصر في هذه الفئة حاليًا</p>
                    </div>
                  )}
                </ScrollArea>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </div>
      </Tabs>
      
      {/* Purchase confirmation modal */}
      {isConfirmingPurchase && selectedItem && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black/80 border border-white/10 rounded-lg p-5 max-w-sm w-full"
          >
            <h2 className="text-xl font-bold mb-3 text-center font-['Changa']">تأكيد الشراء</h2>
            <div className="flex items-center justify-center mb-4">
              <div className="text-5xl p-3">{selectedItem.image}</div>
            </div>
            <p className="text-center mb-5 text-sm">
              هل تريد شراء <span className="text-game-primary font-bold">{selectedItem.name}</span> مقابل <span className="text-game-legendary font-bold">{selectedItem.price}</span> عملة؟
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={cancelPurchase}
                className="border-white/10 hover:border-white/20"
              >
                إلغاء
              </Button>
              <Button 
                onClick={confirmPurchase}
                className="bg-game-primary hover:bg-game-secondary"
              >
                تأكيد الشراء
              </Button>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Mystery box opening animation */}
      {isBoxOpening && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 flex-col">
          <div className="relative max-w-xs w-full h-64 mb-5">
            {!boxReward ? (
              // Box shaking animation
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  rotate: [0, -2, 0, 2, 0],
                  scale: [1, 1.05, 1, 1.05, 1]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity
                }}
              >
                <div className="text-9xl">🎁</div>
              </motion.div>
            ) : (
              // Reward reveal animation
              <motion.div 
                className="absolute inset-0 flex items-center justify-center flex-col"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -3, 3, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-9xl mb-2"
                >
                  {boxReward.includes("XP") ? "⭐" :
                    boxReward.includes("عملة") ? "💰" :
                    boxReward.includes("مضاعف") ? "⚡" :
                    boxReward.includes("طابع") ? "🏆" : "🎮"}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-bold mt-4 bg-gradient-to-r from-game-primary to-game-legendary bg-clip-text text-transparent"
                >
                  {boxReward}
                </motion.p>
              </motion.div>
            )}
          </div>
          
          {boxReward && (
            <Button
              onClick={closeMysteryBox}
              className="mt-5 bg-game-primary hover:bg-game-secondary"
            >
              حسناً
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

// Helper function to get rarity text color classes
function getRarityTextColor(rarity: string): string {
  switch(rarity) {
    case 'legendary': return 'game-legendary';
    case 'epic': return 'game-epic';
    case 'rare': return 'game-rare';
    default: return 'gray-200';
  }
}

export default Shop;
