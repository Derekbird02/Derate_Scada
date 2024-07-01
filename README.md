<div className="flex flex-wrap">
      {Object.keys(organizedData).sort().map(unitnumber => (
        <div key={unitnumber} className="m-4 p-4 border border-gray-300 flex-1">
          <h2 className="text-lg font-bold">Unit {unitnumber}</h2>
          <div className="flex flex-wrap">
            {Object.keys(organizedData[unitnumber]).sort().map(feedernumber => (
              <div key={feedernumber} className="m-2 p-2 border border-gray-200 flex-1">
                <h3 className="text-md font-semibold">Feeder {feedernumber}</h3>
                <ul className="list-none pl-0">
                  {organizedData[unitnumber][feedernumber].map(assetid => (
                    <li key={assetid} className="ml-4">{assetid}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
