export default function itemCartGroupByPublisher(items) {
  return items.reduce((accumulator, item) => {
      const publisherIndex = accumulator.findIndex((x) => x.publisher.PublisherID === item.book.publisher.PublisherID);
      
      if (publisherIndex >= 0) {
        accumulator[publisherIndex].items.push(item);
      } else {
        accumulator.push({
          publisher: item.book.publisher,
          items: [item],
        });
      }
      
      return accumulator;
    }, []);
}