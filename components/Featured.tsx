export default function Featured({ featuredStores }: any) {
  console.log('FT:', featuredStores);

  return (
    <div>
      <p>hello</p>
      <p>{featuredStores[0]}</p>
      <p>{featuredStores[1]}</p>
      <p>{featuredStores[2]}</p>
    </div>
  );
}
