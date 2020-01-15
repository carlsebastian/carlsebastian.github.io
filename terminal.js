$(function() {
    // https://www.coolgenerator.com/ascii-text-generator Big-money-ne
    var greeting = String.raw`
    /$$$$$$$                       /$$      /$$$$$$          /$$ /$$                  /$$$$$$   /$$$$$$
    | $$__  $$                     | $$     /$$__  $$        | $$|__/                 /$$__  $$ /$$__  $$
    | $$  \ $$ /$$$$$$   /$$$$$$  /$$$$$$  | $$  \__//$$$$$$ | $$ /$$  /$$$$$$       | $$  \ $$| $$  \__/
    | $$$$$$$//$$__  $$ /$$__  $$|_  $$_/  | $$$$   /$$__  $$| $$| $$ /$$__  $$      | $$  | $$|  $$$$$$
    | $$____/| $$  \ $$| $$  \__/  | $$    | $$_/  | $$  \ $$| $$| $$| $$  \ $$      | $$  | $$ \____  $$
    | $$     | $$  | $$| $$        | $$ /$$| $$    | $$  | $$| $$| $$| $$  | $$      | $$  | $$ /$$  \ $$
    | $$     |  $$$$$$/| $$        |  $$$$/| $$    |  $$$$$$/| $$| $$|  $$$$$$/      |  $$$$$$/|  $$$$$$/
    |__/      \______/ |__/         \___/  |__/     \______/ |__/|__/ \______/        \______/  \______/

    Made by: Sebastian Gustafsson 😄
    `
    var cmds = String.raw `

    Commands:
    - whoAmI: A tiny description of who i am.
    - getCV: Download my CV in either English/Swedish.
    - showPortfolio: Show samples of projects I've done either in jobs or in my spare time.
    - getSkills: Show which programming-languages I'm familiar with.

    `

    var help_msg = String.raw `
    Need Help? might be able to help you, the following are available commands.
    `
    var mySkills = []
    $.getJSON('data/skills.json', function(data) {
        mySkills = data.items;
    });
    var myPortfolio = []
    $.getJSON('data/portfolio.json', function(data) {
        myPortfolio = data.items;
    });
    $('#terminal').terminal(function(command) {
        command = command.toLowerCase()
        if (command == 'help') {
            this.echo('<h5 class="mt-3">Help</h5>',{raw:true})
            this.echo(help_msg+cmds);
        } else if (command == 'getcv') {
            this.echo('<h5 class="mt-3">My Curriculum Vitae</h5>',{raw:true})
            this.echo('\nGet my CV:')
            this.echo('</br>Download in Swedish 🇸🇪: <a href="cvs/cv-sebastian-gustafsson-2020-swe.pdf" download>Download</a>', {raw:true});
            this.echo('Download in English 🇬🇧: <a href="cvs/cv-sebastian-gustafsson-2020-eng.pdf" download>Download</a>', {raw:true});
            this.echo('\n')
        } else if (command == 'getskills') {
            this.echo('<h5 class="mt-3">Programming Skills</h5>',{raw:true})
            this.echo('</br>These are my programming skills presented using a bar where <span style="text-decoration:underline;color:#ffff00">yellow means familiar</span>, and <span style="text-decoration:underline;color:#005203">dark green means "really good".</span> Take into consideration that this is "my view" on how skilled I am in the different languages.</br></br>',{raw:true})
            sortData(mySkills,'level', false);
            for (var i = 0; i < mySkills.length; i++) {
                var lang = mySkills[i]['language']
                var lvl = mySkills[i]['level']
                this.echo(lang+': <img width="80px" src="pics/skill_'+lvl+'.svg"></img></br>',{raw:true})
            }
        } else if (command == 'showportfolio') {
            // <a href="pics/cv-small.jpg" data-lightbox="image-1" data-title="My caption">Image #1</a>
            this.echo('<h3 class="mt-3">My Projects</h3>',{raw:true})
            this.echo("</br>This is a showcase of some of the projects that I've done either on my spare time or during employments. Just press the button 'Showcase' to find more information about the projects. 😄 </br>",{raw:true})
            sortData(myPortfolio,'title', true);
            for (var i = 0; i < myPortfolio.length; i++) {
                this.echo("<hr>",{raw:true})
                var title = myPortfolio[i]['title']
                var desc = myPortfolio[i]['description']
                this.echo('<h5 class="mt-3">'+title+'</h5>',{raw:true})
                this.echo('</br>'+desc+'</br></br>',{raw:true})
                var imgs = myPortfolio[i]['imgs']
                for (var j = 0; j < imgs.length; j++) {
                    var imgsrc = imgs[j]['src']
                    var imgdesc = imgs[j]['descr']
                    if (j == 0) {
                        this.echo('<a class="btn btn-info" href="'+imgsrc+'" data-lightbox="images-'+i+'" data-title="'+imgdesc+'">Showcase</a>',{raw:true})
                    } else {
                        this.echo('<a style="display:none;" href="'+imgsrc+'" data-lightbox="images-'+i+'" data-title="'+imgdesc+'">Showcase</a>',{raw:true})
                    }
                }

            }
            this.echo("<p></p><hr>",{raw:true})
            this.echo("I have done some other projects during employments but because of NDA's or out of curtesy, I can't showcase them here.",{raw:true})
            this.echo("<p></p>",{raw:true})
        } else if (command == 'whoami') {
            var ami = `
            </br>I am in my fifth year in "Master's Programme in Computer and Information Engineering" at Uppsala University and currently on an exchange year at Robert Gordon university in Aberdeen, Scotland. I will return to Sweden for the summer 2020 and are therefore looking for a suitable Internship to gain more experience. During my first year on my masters, which I had in Uppsala, I focused on Software Engineering, but during my exchange I've taken courses more within the field of Cybersecurity and Network Engineering. Since these are subjects that I really find interesting as well.</br></br>
            I am really interested in a lot of different branches of IT, which is why I'm not completely sure what I would like to work with after graduation. Fields which I would like to try work in would be Software Engineering, Machine Learning, Data Science or Cybersecurity. If it somehow could be combined, that would be excellent. I think the position you're advertising for would be rewarding both in a sense of new experiences but also it might help me become a bit more certain about what I want to do later on.</br></br>
            If I were to name three of my best qualities I would say Team Player, Fast Learner and a Problem Solver. I've been playing team-sports since I was a kid and I think I have projected that upon work I've done in group projects both in School and at employments. Fast learner, for example in situations at earlier employments I've had to learn new programming languages, understand code-bases and systems quickly. When it has been demanded of me, I can pick up on new knowledge fast. Problem solver, I believe that one of the most important and fundamental things we learn in my studies at University is problem solving. It is also something that I really enjoy doing. For example in the month of December I did a Cybersecurity challenge where you were supposed to solve a problem each day for 25 days. I managed to finish the challenge with every problem resolved. That is mainly because I find problem solving very fun, but also because I am stubborn in a sense that I don't give up until I solved it.</br></br>
            If you would like to meet and discuss more connect with me on <a href="https://www.linkedin.com/in/sebastian-gustafsson-b93ba292">linkedin.</a></br></br>
            `
            this.echo("</br><h5> Who am I?</h5>", {raw:true})
            this.echo(ami, {raw:true});
        } else {
            this.echo('\nUnknown Command: write "help" if you need it.\n');
        }
    },{
        greetings: greeting+cmds,
        // outputLimit: 0,
        prompt: 'sebastian-gustafsson@portfolioOS: ',
        //scrollBottomOffset: 10,
    });
});

function sortData(list, prop, asc) {
    list.sort(function(a, b) {
        if (asc) {
            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        } else {
            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        }
    });
}
