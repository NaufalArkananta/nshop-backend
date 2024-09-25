import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({errorFormat: "minimal"})

async function Category() {
    await prisma.categories.createMany({
        data: [
            {name: `Category 1`},
            {name: `Category 2`},
            {name: `Category 3`},
        ],
    })
}

async function Products() {
    await prisma.products.createMany({
        data: [
            {name: `Produk 1`, description: ``, price: 100, stock: 10, category_id: 1},
            {name: `Produk 2`, description: ``, price: 100, stock: 10, category_id: 1},
            {name: `Produk 3`, description: ``, price: 100, stock: 10, category_id: 1},
        ],
    });
}


Category().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});

Products().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
