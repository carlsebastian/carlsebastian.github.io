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
            this.echo('Download in English 🇬🇧: <a href="cvs/cv-sebastian-gustafsson-2020-eng.pdf" download>Download</a>', {raw:true});
            this.echo('\n')
        } else if (command == 'getskills') {
            this.echo('<h5 class="mt-3">Programming Skills</h5>',{raw:true})
            this.echo('</br>These are my programming skills presented using a bar where <span style="text-decoration:underline;color:#bbbb03">yellow means familiar</span>, and <span style="text-decoration:underline;color:#005203">dark green means "really good".</span> Take into consideration that this is "my view" on how skilled I am in the different languages.</br></br>',{raw:true})
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
            </br>------Under Construction------- </br></br>
            If you would like to meet and discuss more connect with me on <a target="_blank" href="https://www.linkedin.com/in/sebastian-gustafsson-b93ba292">linkedin.</a></br></br>
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
