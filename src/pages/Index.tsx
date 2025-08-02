import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface SkinItem {
  id: number;
  name: string;
  weapon: string;
  price: number;
  rarity: 'Потребительский' | 'Промышленный' | 'Армейский' | 'Запрещённый' | 'Секретный' | 'Тайный';
  quality: 'Закалённое в боях' | 'Немного поношенное' | 'После полевых испытаний' | 'Поношенное' | 'Прямо с завода';
  collection: string;
  image: string;
  rating: number;
}

const rarityColors = {
  'Потребительский': 'bg-gray-500',
  'Промышленный': 'bg-blue-500', 
  'Армейский': 'bg-purple-500',
  'Запрещённый': 'bg-pink-500',
  'Секретный': 'bg-red-500',
  'Тайный': 'bg-yellow-500'
};

const mockSkins: SkinItem[] = [
  {
    id: 1,
    name: 'Redline',
    weapon: 'AK-47',
    price: 45.99,
    rarity: 'Секретный',
    quality: 'Поношенное',
    collection: 'Winter Offensive',
    image: '/img/35337050-dec5-47b2-8019-aa1fd378a6e4.jpg',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Lightning Strike',
    weapon: 'AWP',
    price: 189.99,
    rarity: 'Секретный',
    quality: 'Прямо с завода',
    collection: 'Chroma',
    image: '/img/75cbceb6-d163-42d5-8461-7a9b40b9c713.jpg',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Dragon King',
    weapon: 'M4A4',
    price: 125.50,
    rarity: 'Тайный',
    quality: 'После полевых испытаний',
    collection: 'Cache',
    image: '/img/8744826a-1493-4924-9295-1ba97450a6da.jpg',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Fade',
    weapon: 'Glock-18',
    price: 234.00,
    rarity: 'Секретный',
    quality: 'Прямо с завода',
    collection: 'Dust 2',
    image: '/img/5b6534a8-8e32-4ccb-8160-3107e339f89c.jpg',
    rating: 4.6
  },
  {
    id: 5,
    name: 'Tiger Tooth',
    weapon: '★ Karambit',
    price: 999.99,
    rarity: 'Тайный',
    quality: 'Прямо с завода',
    collection: 'Chroma',
    image: '/img/ccbef25f-2684-4806-975e-8869b4e09b6b.jpg',
    rating: 5.0
  },
  {
    id: 6,
    name: 'Dark Water',
    weapon: 'USP-S',
    price: 25.50,
    rarity: 'Армейский',
    quality: 'Поношенное',
    collection: 'Arms Deal',
    image: '/img/31d8571a-31b6-4fdd-8d5d-7f97dfddf061.jpg',
    rating: 4.3
  },
  {
    id: 7,
    name: 'Asiimov',
    weapon: 'AWP',
    price: 89.99,
    rarity: 'Тайный',
    quality: 'После полевых испытаний',
    collection: 'Operation Phoenix',
    image: '/img/75cbceb6-d163-42d5-8461-7a9b40b9c713.jpg',
    rating: 4.8
  },
  {
    id: 8,
    name: 'Vulcan',
    weapon: 'AK-47',
    price: 67.99,
    rarity: 'Секретный',
    quality: 'Немного поношенное',
    collection: 'Phoenix',
    image: '/img/35337050-dec5-47b2-8019-aa1fd378a6e4.jpg',
    rating: 4.7
  },
  {
    id: 9,
    name: 'Howl',
    weapon: 'M4A4',
    price: 1899.99,
    rarity: 'Тайный',
    quality: 'Прямо с завода',
    collection: 'Huntsman',
    image: '/img/8744826a-1493-4924-9295-1ba97450a6da.jpg',
    rating: 5.0
  },
  {
    id: 10,
    name: 'Kill Confirmed',
    weapon: 'USP-S',
    price: 45.50,
    rarity: 'Секретный',
    quality: 'Поношенное',
    collection: 'Gamma',
    image: '/img/31d8571a-31b6-4fdd-8d5d-7f97dfddf061.jpg',
    rating: 4.5
  },
  {
    id: 11,
    name: 'Hypnotic',
    weapon: 'Nova',
    price: 12.99,
    rarity: 'Промышленный',
    quality: 'Закалённое в боях',
    collection: 'Dust 2',
    image: '/img/35337050-dec5-47b2-8019-aa1fd378a6e4.jpg',
    rating: 3.8
  },
  {
    id: 12,
    name: 'Case Hardened',
    weapon: 'AK-47',
    price: 156.00,
    rarity: 'Армейский',
    quality: 'Немного поношенное',
    collection: 'Arms Deal',
    image: '/img/35337050-dec5-47b2-8019-aa1fd378a6e4.jpg',
    rating: 4.4
  }
];

export default function Index() {
  const [cart, setCart] = useState<SkinItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const addToCart = (skin: SkinItem) => {
    setCart([...cart, skin]);
  };

  const removeFromCart = (skinId: number) => {
    setCart(cart.filter(item => item.id !== skinId));
  };

  const filteredSkins = mockSkins.filter(skin => {
    const matchesSearch = skin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skin.weapon.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = selectedRarity === 'all' || skin.rarity === selectedRarity;
    const matchesQuality = selectedQuality === 'all' || skin.quality === selectedQuality;
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'under50' && skin.price < 50) ||
                        (priceRange === '50to100' && skin.price >= 50 && skin.price <= 100) ||
                        (priceRange === 'over100' && skin.price > 100);
    
    return matchesSearch && matchesRarity && matchesQuality && matchesPrice;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary glow-border px-4 py-2 rounded-lg">CS2 SKINS STORE</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Icon name="Home" className="mr-2" size={16} />
                Главная
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Icon name="Grid3X3" className="mr-2" size={16} />
                Каталог
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Icon name="Trophy" className="mr-2" size={16} />
                Рейтинг
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Icon name="User" className="mr-2" size={16} />
                Профиль
              </Button>
              <Button variant="ghost" className="text-foreground hover:text-primary">
                <Icon name="HelpCircle" className="mr-2" size={16} />
                Поддержка
              </Button>
            </nav>
            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative hover-glow">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground min-w-[20px] h-5">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина ({cart.length})</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 border rounded">
                            <div>
                              <p className="font-medium">{item.weapon} | {item.name}</p>
                              <p className="text-sm text-muted-foreground">${item.price}</p>
                            </div>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Icon name="X" size={16} />
                            </Button>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-bold">Итого:</span>
                            <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
                          </div>
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-glow"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              ЛУЧШИЕ СКИНЫ
              <span className="block text-primary">CS2</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
              Покупай, продавай и торгуй скинами Counter-Strike 2
            </p>
            <Button size="lg" className="animate-scale-in hover-glow bg-primary hover:bg-primary/90">
              <Icon name="Zap" className="mr-2" size={20} />
              Начать торговлю
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              placeholder="Поиск скинов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-background border-border"
            />
            <Select value={selectedRarity} onValueChange={setSelectedRarity}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Редкость" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все редкости</SelectItem>
                <SelectItem value="Потребительский">Потребительский</SelectItem>
                <SelectItem value="Промышленный">Промышленный</SelectItem>
                <SelectItem value="Армейский">Армейский</SelectItem>
                <SelectItem value="Запрещённый">Запрещённый</SelectItem>
                <SelectItem value="Секретный">Секретный</SelectItem>
                <SelectItem value="Тайный">Тайный</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedQuality} onValueChange={setSelectedQuality}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Качество" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все качества</SelectItem>
                <SelectItem value="Закалённое в боях">Закалённое в боях</SelectItem>
                <SelectItem value="Немного поношенное">Немного поношенное</SelectItem>
                <SelectItem value="После полевых испытаний">После полевых испытаний</SelectItem>
                <SelectItem value="Поношенное">Поношенное</SelectItem>
                <SelectItem value="Прямо с завода">Прямо с завода</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Цена" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все цены</SelectItem>
                <SelectItem value="under50">До $50</SelectItem>
                <SelectItem value="50to100">$50 - $100</SelectItem>
                <SelectItem value="over100">Свыше $100</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="hover-glow">
              <Icon name="Filter" className="mr-2" size={16} />
              Сбросить
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="catalog">Каталог</TabsTrigger>
            <TabsTrigger value="popular">Популярные</TabsTrigger>
            <TabsTrigger value="new">Новинки</TabsTrigger>
          </TabsList>
          
          <TabsContent value="catalog" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkins.map((skin) => (
                <Card key={skin.id} className="hover-glow bg-card border-border animate-fade-in">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={skin.image} 
                        alt={skin.name}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <Badge 
                        className={`absolute top-2 right-2 ${rarityColors[skin.rarity]} text-white`}
                      >
                        {skin.rarity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">{skin.weapon}</CardTitle>
                    <p className="text-primary font-medium mb-2">{skin.name}</p>
                    <div className="flex items-center mb-2">
                      <Icon name="Star" className="text-yellow-500 mr-1" size={16} />
                      <span className="text-sm text-muted-foreground">{skin.rating}/5</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Качество: {skin.quality}</p>
                    <p className="text-sm text-muted-foreground">Коллекция: {skin.collection}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">${skin.price}</span>
                    <Button 
                      onClick={() => addToCart(skin)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground hover-glow"
                    >
                      <Icon name="ShoppingCart" className="mr-2" size={16} />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="popular" className="mt-8">
            <div className="text-center py-12">
              <Icon name="TrendingUp" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Популярные скины загружаются...</p>
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-8">
            <div className="text-center py-12">
              <Icon name="Sparkles" size={64} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Новинки скоро появятся...</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-primary">CS2 SKINS STORE</h3>
              <p className="text-sm text-muted-foreground">
                Лучший маркетплейс для покупки и продажи скинов Counter-Strike 2
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Главная</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Рейтинг</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Профиль</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="hover:text-primary">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="hover:text-primary">
                  <Icon name="Users" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="hover:text-primary">
                  <Icon name="Mail" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CS2 Skins Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}