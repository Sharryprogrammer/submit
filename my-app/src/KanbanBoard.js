import React from 'react';
import emp from './img/empty-circle.png';
import half from './img/yellow.png';
import can from './img/cancel.png';
import red from './img/red.png';
import low from './img/low.png';
import high from './img/high.png';
import med from './img/med.png';
import thr from './img/thr.png';
import grey from './img/grey.png';


function stringToColor(str) {
  // console.log(str);

  if(str==='usr-1')
    return 'cyan';
  if(str==='usr-2')
    return 'lightgreen';
  if(str==='usr-3')
    return '#CBC3E3';
  if(str==='usr-4')
    return 'darkblue';

}


function KanbanBoard({ tickets, groupingOption, sortingOption }) {

  const groupTickets = (tickets, groupingOption) => {
    if (groupingOption === 'status') {
        const grouped = {};
        tickets.forEach((ticket) => {
        if (!grouped[ticket.status]) {
             grouped[ticket.status] = [];
        }
        grouped[ticket.status].push(ticket);
      });
      return grouped;
    } 
    
    else if (groupingOption === 'user') {
      const grouped = {};
      tickets.forEach((ticket) => {
        if (!grouped[ticket.userId]) {
            grouped[ticket.userId] = [];
        }
      grouped[ticket.userId].push(ticket);
      });
      return grouped;
    } 
    
    else if (groupingOption === 'priority') {
      const priorityGroups = {
        0: 'No priority ',
        1: 'Low ',
        2: 'Medium ',
        3: 'High ',
        4: 'Urgent ',
      };

      const grouped = {};
      tickets.forEach((ticket) => {
        if (priorityGroups[ticket.priority]) {
          const groupName = priorityGroups[ticket.priority];
          if (!grouped[groupName]) {
            grouped[groupName] = [];
          }
          grouped[groupName].push(ticket);
        }
      });

      return grouped;
    }
  };

  const sortTickets = (tickets, sortingOption) => {
    if (sortingOption === 'priority') {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    } else if (sortingOption === 'title') {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
  };
  // getBackgroundColor 
  const groupedTickets = groupTickets(tickets, groupingOption);
  console.log(groupedTickets); // Add this line to log the grouping names
  const sortedTickets = sortTickets(tickets, sortingOption);

  return (
    
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((group, index) => (
        <div key={index} className="group">
        
          <h2 className="group-header">
            { group === 'No priority ' ? (
              <>
                <img src={thr} alt="thr" className="thr-icon" />
                {group}
              </>
            ) : group === 'High ' ? (
              <>
                <img src={high} alt="high" className="high-icon" />
                {group}
              </>
            ) : group === 'Low ' ? (
              <>
                <img src={low} alt="low" className="low-icon" />
                {group}
              </>
            ) : group === 'Medium ' ? (
              <>
                <img src={med} alt="med" className="med-icon" />
                {group}
              </>
            ) : group === 'Urgent ' ? (
              <>
                <img src={red} alt="Red" className="red-icon" />
                {group}
              </>
            ) : group === 'Todo' ? (
              <>
                <img src={emp} alt="Empty" className="emp-icon" />
                {group}
              </>
            ) : group === 'In progress' ? (
              <>
                <img src={half} alt="Half" className="half-icon" />
                {group}
              </>
            ) : group === 'Backlog' ? (
              <>
                <img src={can} alt="Can" className="can-icon" />
                {group}
              </>
            ) : (
              group
            )} ({groupedTickets[group].length}) <button className="add-button">+</button>
          </h2>


          {sortedTickets.map((ticket) => {
            if (groupedTickets[group].includes(ticket)) {
              return (
                <div key={ticket.id} className="ticket">
                  <div className="ticket-header">
                  {groupingOption === 'user' && 
                  <div>
                  {
                    ticket.status==='Todo' && <div className="nlast"> <img src={emp} alt="Empty" className="emp-icon" /></div>
                  }
                  {
                    ticket.status==='Backlog' && <div className="nlast">  <img src={can} alt="Can" className="can-icon" /></div>
                  }
                  {
                    ticket.status==='In progress' && <div className="last"><img src={half} alt="Half" className="half-icon" /></div>
                  }
                  </div>}
                  {groupingOption === 'priority' && 
                  <div>
                  {
                    ticket.status==='Todo' && <div className="nlast"> <img src={emp} alt="Empty" className="emp-icon" /></div>
                  }
                  {
                    ticket.status==='Backlog' && <div className="nlast">  <img src={can} alt="Can" className="can-icon" /></div>
                  }
                  {
                    ticket.status==='In progress' && <div className="last"><img src={half} alt="Half" className="half-icon" /></div>
                  }
                  </div>
                  }
                  
                    <div className="ticket-id">{ticket.id}</div>
                    <div id="container" style={{ backgroundColor: stringToColor(ticket.userId) }}>
                      <div id="name" >
                        {ticket.userId.charAt(0).toUpperCase()}{ticket.userId.charAt(ticket.userId.length - 1)}
                      </div>
                    </div>
                    {/* <div id="ncontainer" style={{ backgroundColor: 'lightgrey' }}>
                      <div id="nname" >
                      
                      </div>
                    </div> */}
                  </div>
                  <div className="ticket-title">{ticket.title}</div>
                  <div className="ticket-info">
                  {groupingOption === 'status' && 
                  <div>
                  {
                    ticket.priority===1 && <div className="last"> <img src={low} alt="low" className="low-icon" /></div>
                  }
                  {
                    ticket.priority===2 && <div className="last">  <img src={med} alt="med" className="med-icon" /></div>
                  }
                  {
                    ticket.priority===3 && <div className="last"> <img src={high} alt="high" className="high-icon" /> </div>
                  }
                  {
                    ticket.priority===4 && <div className="last"> <img src={red} alt="Red" className="red-icon" /></div>
                  }
                  {
                    ticket.priority===0 && <div className="last"> <img src={thr} alt="thr" className="thr-icon" /></div>
                  }
                  </div>
                  }
                 
                  {groupingOption === 'user' && 
                  <div>
                  {
                    ticket.priority===1 && <div className="last"> <img src={low} alt="low" className="low-icon" /></div>
                  }
                  {
                    ticket.priority===2 && <div className="last">  <img src={med} alt="med" className="med-icon" /></div>
                  }
                  {
                    ticket.priority===3 && <div className="last"> <img src={high} alt="high" className="high-icon" /> </div>
                  }
                  {
                    ticket.priority===4 && <div className="last"> <img src={red} alt="Red" className="red-icon" /></div>
                  }
                  {
                    ticket.priority===0 && <div className="last"> <img src={thr} alt="thr" className="thr-icon" /></div>
                  }
                  </div>
                  }

                    {/* 
                    
                    <div>
                      User: {ticket.userId}
                    </div> */}
                    <div className="ticket-tag"><img src={grey} alt="grey" className="grey-icon" />Feature Request</div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
