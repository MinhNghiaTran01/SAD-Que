const ReagularList = ({ items, resourceName, itemComponent: ItemComonent }) => {
  return (
    <>
      {items.map((item, i) => {
        return <ItemComonent key={i} {...{ [resourceName]: item }} />;
      })}
    </>
  );
};
export default ReagularList;
