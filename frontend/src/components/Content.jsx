const Content = ({ selected }) => {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-cyan-600 mb-4">{selected}</h2>
        <div className="bg-white p-4 shadow rounded">
          <p>This is the <strong>{selected}</strong> section content.</p>
        </div>
      </div>
    );
  };
  
  export default Content;
  