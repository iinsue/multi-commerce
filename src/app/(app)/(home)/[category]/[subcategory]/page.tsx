interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

// http://localhost:3000/[category]/[subcategory]
const SubCategoryPage = async ({ params }: Props) => {
  const { category, subcategory } = await params;

  return (
    <>
      <div>
        Category: {category}
        <br />
        Subcategory: {subcategory}
      </div>
    </>
  );
};

export default SubCategoryPage;
