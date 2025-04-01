
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Coins, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Shop item types
type ItemCategory = 'avatars' | 'backgrounds' | 'mystery';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: ItemCategory;
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
  },
  {
    id: 'avatar-2',
    name: 'أفاتار النجم',
    description: 'أفاتار مميز بشكل نجمة',
    image: '⭐',
    price: 150,
    category: 'avatars',
  },
  {
    id: 'avatar-3',
    name: 'أفاتار الذكي',
    description: 'أفاتار مميز بنظارة ذكية',
    image: '🤓',
    price: 100,
    category: 'avatars',
  },
  {
    id: 'bg-1',
    name: 'خلفية النجوم',
    description: 'خلفية فضائية مميزة للبروفايل',
    image: '🌌',
    price: 300,
    category: 'backgrounds',
  },
  {
    id: 'bg-2',
    name: 'خلفية الجبال',
    description: 'خلفية طبيعية مميزة للبروفايل',
    image: '🏔️',
    price: 250,
    category: 'backgrounds',
  },
  {
    id: 'mystery-1',
    name: 'صندوق غامض',
    description: 'محتويات مفاجئة وعشوائية',
    image: '🎁',
    price: 500,
    category: 'mystery',
  },
];

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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">المتجر</h1>
          <p className="text-gray-400 mt-1">اشتر عناصر مميزة باستخدام العملات</p>
        </div>
        
        <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-700">
          <Coins className="h-5 w-5 text-game-accent" />
          <span className="text-white font-bold">{user?.coins || 0}</span>
          <span className="text-gray-400">عملة</span>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          className={`px-4 py-2 ${selectedCategory === 'all' ? 'text-game-primary border-b-2 border-game-primary' : 'text-gray-400'}`}
          onClick={() => setSelectedCategory('all')}
        >
          الكل
        </button>
        <button
          className={`px-4 py-2 ${selectedCategory === 'avatars' ? 'text-game-primary border-b-2 border-game-primary' : 'text-gray-400'}`}
          onClick={() => setSelectedCategory('avatars')}
        >
          الأفاتارات
        </button>
        <button
          className={`px-4 py-2 ${selectedCategory === 'backgrounds' ? 'text-game-primary border-b-2 border-game-primary' : 'text-gray-400'}`}
          onClick={() => setSelectedCategory('backgrounds')}
        >
          الخلفيات
        </button>
        <button
          className={`px-4 py-2 ${selectedCategory === 'mystery' ? 'text-game-primary border-b-2 border-game-primary' : 'text-gray-400'}`}
          onClick={() => setSelectedCategory('mystery')}
        >
          صناديق غامضة
        </button>
      </div>
      
      {/* Shop Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="game-panel hover:border-game-primary transition-colors">
            <div className="text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="h-20 w-20 bg-gray-800 rounded-full flex items-center justify-center text-4xl">
                  {item.image}
                </div>
              </div>
              
              <h3 className="font-semibold text-white mb-2">{item.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{item.description}</p>
              
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-1 text-game-accent">
                  <Coins className="h-4 w-4" />
                  <span className="font-bold">{item.price}</span>
                </div>
                
                <button
                  onClick={() => handlePurchase(item)}
                  className={`game-btn text-sm flex items-center gap-1 ${(user?.coins || 0) < item.price ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={(user?.coins || 0) < item.price}
                >
                  <ShoppingCart className="h-4 w-4" />
                  شراء
                </button>
              </div>
              
              {(user?.coins || 0) < item.price && (
                <p className="text-red-500 text-xs mt-2">لا تملك عملات كافية</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">لا توجد عناصر متاحة في هذه الفئة حالياً</p>
        </div>
      )}
      
      {/* Purchase Confirmation Modal */}
      {isConfirmingPurchase && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="game-panel max-w-md w-full animate-scale-in">
            <div className="text-center">
              <div className="flex justify-center items-center mb-4">
                <div className="h-16 w-16 bg-gray-800 rounded-full flex items-center justify-center text-3xl">
                  {selectedItem.image}
                </div>
              </div>
              
              <h3 className="font-semibold text-white text-lg mb-2">تأكيد الشراء</h3>
              <p className="text-gray-400 text-sm mb-4">
                هل أنت متأكد من رغبتك في شراء {selectedItem.name} مقابل {selectedItem.price} عملة؟
              </p>
              
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={cancelPurchase}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  إلغاء
                </button>
                
                <button
                  onClick={confirmPurchase}
                  className="game-btn"
                >
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
