            <div className="w-1/3 flex flex-col items-center p-4">

                <div className="dark:bg-gray-700 p-4 rounded-lg shadow-md">
                <h3 className="text-center font-semibold mb-2 text-white">Top 15 Variables</h3>
                <PieChart series={[{ data: topVariables, innerRadius: 50, outerRadius: 100 }]} width={300} height={300} slotProps={{ legend: { hidden: true } }} />
                </div>

                <div className="dark:bg-gray-700 p-4 rounded-lg shadow-md mt-6">
                <h3 className="text-center font-semibold mb-2 text-white">Top 15 Devices</h3>
                <PieChart series={[{ data: topDevices, innerRadius: 50, outerRadius: 100 }]} width={300} height={300} slotProps={{ legend: { hidden: true } }}/>
                </div>

                <div className="dark:bg-gray-700 p-4 rounded-lg shadow-md mt-6">
                <h3 className="text-center font-semibold mb-2 text-white">Top 15 Sites</h3>
                <PieChart series={[{ data: topSites, innerRadius: 50, outerRadius: 100 }]} width={300} height={300} slotProps={{ legend: { hidden: true } }}/>
                </div>
            </div>
