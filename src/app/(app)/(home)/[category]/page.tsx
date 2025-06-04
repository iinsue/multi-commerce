interface Props {
  params: Promise<{ category: string }>;
}

// http://localhost:3000/[category]
const CategoryPage = async ({ params }: Props) => {
  const { category } = await params;

  return (
    <>
      <div>Category: {category}</div>
    </>
  );
};

export default CategoryPage;
