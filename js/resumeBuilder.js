
//var formattedName = "";
//var formattedRole = "";
//
//formattedName = HTMLheaderName.replace('%data%', 'Vidal Uson');
//formattedRole = HTMLheaderRole.replace('%data%', 'Sr. Technical Architect');
//$('#header').prepend(formattedName + formattedRole);

var bio = {
    "name":"Vidal Uson",
    "role":"Senior Technical Architect",
    "contacts": {
        "email":"vu7518@att.com",
        "mobilePhone":"925-823-9850",
        "location":"San Ramon"
    },
    "skills": [
        "Web Developer", "Mainframe Programmer"
    ]
}
var work = {
    "jobs": [
        {
            "employer":"AT&T",
            "title":"Senior Technical Architect",
            "dates":"November 1995 - Present",
            "location":"San Ramon, CA, USA",
            "description":"Web Developer"
        },
        {
            "employer":"Philippine Long Distance Telephone Company",
            "title":"Senior Analyst/Programmer",
            "dates":"August 1988 - August 1995",
            "location":"Manila, Philippines",
            "description":"Mainframe Developer for Service Order and Billing Systems"
        }
    ]
}
var education = {
    "schools": [
        {
            "name": "Adamson University",
            "city": "Manila, Philippines",
            "degree": "undergraduate",
            "major": "AB",
            "dates": "1980-1984"
        }
    ],
    "onlineCourses":[
        {
            "title":"Javascript Crash Course",
            "school":"Udacity",
            "dates": 2014,
            "url":"http://www.udacity.com/course/ud804"
        }
    ]
};
var project = {
    "projects": [
        {
            "title":"Energy",
            "dates":"2014 - Present",
            "description":"Monitor how the company is supporting Energy, Recycling, Retail and Water initiatives"
        },
        {
            "title":"Mom",
            "dates":"2013 - 2014",
            "description":"Month to month Financial and Budget Analysis of projects"
        }
    ]
}

bio.display = function () {

    var formattedName = HTMLheaderName.replace('%data%', this['name']);
    var formattedRole = HTMLheaderRole.replace('%data%', this['role']);
    $('#header').prepend(formattedName + formattedRole);

    var formattedBioPic = HTMLbioPic.replace('%data%','http://placehold.it/100x75');
    $('#header').append(formattedBioPic);

    var formattedEmail = HTMLemail.replace('%data%', this.contacts.email);
    var formattedMobile = HTMLmobile.replace('%data%', this.contacts.mobilePhone);
    var formattedLocation = HTMLlocation.replace('%data%', this.contacts.location);
    $('#topContacts').append(formattedEmail + formattedMobile + formattedLocation);

    var bioSkills = this.skills;
    if(bioSkills.length) {
        $('#header').append(HTMLskillsStart);
        var formattedSkills = "";
        for (var i = 0; i < bioSkills.length; i++) {
            formattedSkills += HTMLskills.replace('%data%', bioSkills[i]);
        }
        $('#skills').append(formattedSkills);
    }
}
bio.display();

work.display = function () {
    for (var job in this.jobs) {
        $('#workExperience').append(HTMLworkStart);
        var formattedEmployer = HTMLworkEmployer.replace("%data%", this.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", this.jobs[job].title);
        var formattedDates = HTMLworkDates.replace("%data%", this.jobs[job].dates);
        var formattedDesc = HTMLworkDescription.replace("%data%", this.jobs[job].description);
        var formattedEmployerTitle = formattedEmployer
            + formattedTitle
            + formattedDates
            + formattedDesc;
        $(".work-entry:last").append(formattedEmployerTitle);
    }
}
work.display();

project.display = function () {
    for (var proj in this.projects) {
        //console.log(this.projects[proj].title);
        $('#projects').append(HTMLprojectStart);
        var formattedPTitle = HTMLprojectTitle.replace("%data%", this.projects[proj].title);
        var formattedPDates = HTMLprojectDates.replace("%data%", this.projects[proj].dates);
        var formattedPDesc = HTMLprojectDescription.replace("%data%", this.projects[proj].description);
        var formattedProject = formattedPTitle
            + formattedPDates
            + formattedPDesc;
        $(".project-entry:last").append(formattedProject);
    }
}
project.display();

document.getElementById("education").style.backgroundColor = "black";

$(document).click(function(loc) {
    // your code goes here
    logClicks(loc.pageX, loc.pageY);
});


//"Can't compare relationships becuase [this value] and [that value] [is]/[are] not [a] number[s]."
//"Can't compare relationships becuase [this value] and [undefined] [is]/[are] not [a] number[s]."



/*

function inName(thisStr) {
    var parts = thisStr.split(" ");
    parts[1] = parts[1].toUpperCase();
    parts[0] = parts[0].slice(0,1).toUpperCase() + parts[0].slice(1).toLowerCase();
    return parts.join(" ");
}

$(document).ready(function () {
    $('#main').append(internationalizeButton);
    $('button').click(function () {
        console.log(inName("sebastian thrun"));
    });
})
*/

$("#mapDiv").append(googleMap);