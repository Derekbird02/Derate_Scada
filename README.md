Process Document: Automated ETG Trip Analysis Procedure
1. Purpose
The purpose of this procedure is to introduce and standardize the use of automated ETG (Event Trip Generator) analysis for turbine trip events. This automation enhances the quality and consistency of root cause analysis (RCA) by systematically processing turbine trip files, identifying fault conditions, and generating structured outputs tailored to specific fault codes.
By implementing this process, operators and engineering management (EM) will benefit from faster turnaround, higher accuracy in diagnosis, and a stronger foundation for trust in automation-driven RCA.
2. Scope
This process applies to all turbine trip events where ETG analysis is available and applicable. The procedure is currently being introduced as a pilot program, where operators will continue performing manual analyses while cross-referencing results from the automation. Operator feedback will be used to validate the accuracy and reliability of the automated process before full implementation.
3. Use Case
Problem Addressed: Turbine trips often require detailed RCA to identify the fault condition. Manual analysis of trip files is time-intensive and prone to variability.
Solution Provided: The automation executes ETG analyses automatically, processes trip files based on the identified fault codes, and provides operators with structured results and Grafana dashboard links for review.
Benefits:
Faster RCA initiation
Improved diagnostic consistency
Reduced operator workload
Establishes confidence interval for automation
4. Process Logic
Step 1 – Turbine Trip Event
A turbine trip occurs and automatically generates a case in the case management system.
Step 2 – Trip File Availability Decision
The automation evaluates if trip files are expected to be available for the turbine.
If trip files are expected:
The case is snoozed for 1 hour to allow files to be generated.
After 1 hour, the automation checks for available ETG analysis results:
Results found:
A custom Grafana dashboard link is generated for the case.
The case is moved to the L2 Queue.
An automated email alert is sent to the assigned operator.
No results found:
The case is moved directly to the L2 Queue.
An automated email alert is sent to the assigned operator.
If trip files are not expected:
The case is moved directly to the L2 Queue.
An automated email alert is sent to the assigned operator.
5. Operator Interaction
During the pilot phase, operators are expected to:
Review the trip event as usual and perform a manual analysis of the turbine trip.
Access the Grafana dashboard link (if provided) and review the automated ETG analysis results.
Cross-reference their manual conclusions with the automation’s results.
Provide feedback on:
Accuracy of the automated RCA
Completeness of the analysis
Suggestions for improvement
This feedback will be collected and used to measure the confidence level of the automation.
6. Roles and Responsibilities
Operators:
Continue performing manual RCAs during the pilot.
Cross-reference results with automation outputs.
Submit feedback through designated feedback channels.
Automation Development Team:
Maintain automation logic.
Monitor performance and reliability.
Incorporate operator feedback into future iterations.
Engineering Management (EM):
Review pilot outcomes.
Decide on progression toward full automation.
7. Success Criteria
The pilot will be deemed successful when:
Automation results match or exceed manual operator conclusions with a high confidence interval.
Operators report that the automation reduces time spent on analysis without sacrificing quality.
The process integrates smoothly into existing workflows with minimal disruption.
8. Next Steps
Following the pilot:
If accuracy is confirmed, automation may be extended to fully execute RCA for EMs without operator intervention.
Continuous improvements will be made based on operator input and statistical performance tracking.
