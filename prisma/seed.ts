import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed untuk tabel users
  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password_123',
        address: '123 Main St',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'hashed_password_456',
        address: '456 Oak St',
      },
    ],
  });

  // Seed untuk tabel categories
  await prisma.categories.createMany({
    data: [
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Books' },
    ],
  });

  // Seed untuk tabel products
  await prisma.products.createMany({
    data: [
      {
        name: 'Smartphone',
        description: 'Latest smartphone with cool features',
        price: 699.99,
        stock: 50,
        photo: 'smartphone.jpg',
        category_id: 1, // Assuming Electronics category
      },
      {
        name: 'T-Shirt',
        description: 'Cotton T-Shirt',
        price: 19.99,
        stock: 100,
        photo: 'tshirt.jpg',
        category_id: 2, // Assuming Clothing category
      },
      {
        name: 'Novel',
        description: 'Bestselling novel',
        price: 9.99,
        stock: 30,
        photo: 'novel.jpg',
        category_id: 3, // Assuming Books category
      },
    ],
  });

  // Seed untuk tabel orders
  await prisma.orders.create({
    data: {
      user_id: 2, // Assuming John Doe's user ID
      orderStatus: 'PENDING',
      totalPrice: 729.98,
      order_details: {
        create: [
          { product_id: 9, quantity: 1, price: 100 },
          { product_id: 10, quantity: 1, price: 123 },
        ],
      },
    },
  });

  // Seed untuk tabel payments
  await prisma.payments.create({
    data: {
      orders_id: 3, // Assuming first order
      paymentMethod: 'CREDIT_CARD',
      paymentStatus: 'PAID',
      paymentDate: new Date(),
    },
  });

  // Seed untuk tabel admin
  await prisma.admin.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'hashed_admin_password',
      role: 'SUPER_ADMIN',
    },
  });

  // Seed untuk tabel admin_actions
  await prisma.admin_actions.create({
    data: {
      admin_id: 1, // Assuming Admin User's ID
      actionType: 'CREATE',
      targetType: 'PRODUCT',
      target_id: 9, // Assuming the first product
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
