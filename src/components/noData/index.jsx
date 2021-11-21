import noData from '@/assets/no-data.jpg';

export default function NoData() {
  return (
    <>
      <div className="no-data">
        <img src={noData} alt="no-data" />
      </div>
    </>
  );
}
