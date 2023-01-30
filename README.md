
##README  
The application supports opt-in voting and tracks staking information 
with an ApplicationStateValue and AccountStateValue.  

The voting contract has a proposal creation feature, voting and result retrieval capabilities.  

We used External functions with authorization checks and implemented error checking,  
such as ensuring voting is within a specified time range and checks if a user has already voted.  
The voting result is determined by the number of "yes" and "no" votes  
that can be retrieved by the creator.  
The application also includes a clear vote function.  
