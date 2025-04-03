<div className="flex flex-col items-center gap-6 p-6">
      {/* Top Row - Two Pie Charts */}
      <div className="flex justify-center gap-6 w-full">
        <div className="dark:bg-gray-700 p-4 rounded-lg shadow-md w-1/2">
          <h3 className="text-center font-semibold mb-2 text-white">Top 15 Customers</h3>
          <PieChart
            series={[{ data: topCustomers, innerRadius: 50, outerRadius: 100 }]}
            width={300}
            height={300}
            slotProps={{ legend: { hidden: true } }}
          />
        </div>

        <div className="dark:bg-gray-700 p-4 rounded-lg shadow-md w-1/2">
          <h3 className="text-center font-semibold mb-2 text-white">Top 15 Devices</h3>
          <PieChart
            series={[{ data: topDevices, innerRadius: 50, outerRadius: 100 }]}
            width={300}
            height={300}
            slotProps={{ legend: { hidden: true } }}
          />
        </div>
      </div>

      {/* Bottom Row - Single Pie Chart */}
      <div className="dark:bg-gray-700 p-4 rounded-lg shadow-md w-1/2">
        <h3 className="text-center font-semibold mb-2 text-white">Top 15 Sites</h3>
        <PieChart
          series={[{ data: topSites, innerRadius: 50, outerRadius: 100 }]}
          width={300}
          height={300}
          slotProps={{ legend: { hidden: true } }}
        />
      </div>
    </div>
