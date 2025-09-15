Can you write a profession process document for a new procedure I am introducing. I want this to be a document that lists the use case for this procedure, logic of the automation, and how users are supposed to interact with it. The automation created runs ETG analysis documents that were created for operators, to run automatically. 
The point of this procedure is to deliver higher quality root cause analysis for the cause of a turbine trip. This is done by analyzing trip files for the fault and running a automated process tailor to specific fault codes. 
The process goes as follows:
1.	Turbine trips and creates a case
2.	Decides if turbine will most likely have trip files available
a.	If yes then it will snooze the case for 1 hour
b.	After an hour it will check if any automation results from the process are available
i.	If yes then it will build a custom link for that case in our Grafana dashboard for operator to analyze the results of the trip
ii.	After building the link it will place the case into the L2 Queue and send an automated email alerting operator that a case is waiting
c.	If no then it will place the the case into the L2 Queue and send an automated email alerting operator that a case is waiting
3.	  If no then it will place the the case into the L2 Queue and send an automated email alerting operator that a case is waiting
For the pilot of this process, we are asking operators to analyze the trips manually and then cross reference the result they got with the automation results. With operator feedback it will help build a confidence interval for us to trust automation to run fully for EMs with no operator intervention needed.
