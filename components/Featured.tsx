export default function Featured({ featuredStores }: any) {
	console.log('FT:', featuredStores)

	return (
		<div>
			<ul>
				{featuredStores.map((store: any) => (
					<li key={store.storeName}>
						<h1>Featured Stores</h1>
						<h1>{store.storeStory}</h1>
						<img src={store.storeImg} alt={store.storeName} />
						<p>{store.storeStory}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
