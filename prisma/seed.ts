import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();


  await prisma.product.createMany({
    data: [
      { name: "Luxe Dress", description: "Elegant evening dress", price: 199.9, imageUrl: "/dress.png"},
      { name: "Casual Tee", description: "Soft Cotton t-shirt", price:29.99, imageUrl: "/tee.png"},
      { name: "Sneakers", description: "Comfortable running sneakers", price:89.99, imageUrl:"/sneakers.png"},
    ]
  });

  console.log("Seeding Complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  