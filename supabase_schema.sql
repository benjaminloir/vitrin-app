-- Create Stores Table
CREATE TABLE IF NOT EXISTS stores (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  whatsapp_number TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE, -- New: Verified status
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image TEXT DEFAULT '📦',
  condition TEXT DEFAULT 'new',
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public stores are viewable by everyone" ON stores;
CREATE POLICY "Public stores are viewable by everyone" 
ON stores FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own store" ON stores;
CREATE POLICY "Users can insert their own store" 
ON stores FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own store" ON stores;
CREATE POLICY "Users can update their own store" 
ON stores FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Public products are viewable by everyone" ON products;
CREATE POLICY "Public products are viewable by everyone" 
ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Store owners can insert products" ON products;
CREATE POLICY "Store owners can insert products" 
ON products FOR INSERT WITH CHECK (auth.uid() = store_id);

DROP POLICY IF EXISTS "Store owners can update products" ON products;
CREATE POLICY "Store owners can update products" 
ON products FOR UPDATE USING (auth.uid() = store_id);

DROP POLICY IF EXISTS "Store owners can delete products" ON products;
CREATE POLICY "Store owners can delete products" 
ON products FOR DELETE USING (auth.uid() = store_id);

-- Function to increment views (RPC)
CREATE OR REPLACE FUNCTION increment_store_views(store_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE stores
  SET views = views + 1
  WHERE id = store_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment product clicks (RPC)
CREATE OR REPLACE FUNCTION increment_product_clicks(product_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE products
  SET clicks = clicks + 1
  WHERE id = product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
