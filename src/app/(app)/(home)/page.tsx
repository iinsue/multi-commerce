import configPromise from "@payload-config";
import { getPayload } from "payload";

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, // Populate subcategories
    where: {
      parent: {
        exists: false,
      },
    },
  });

  return (
    <div>
      <div>{JSON.stringify(data, null, 2)}</div>
    </div>
  );
}
