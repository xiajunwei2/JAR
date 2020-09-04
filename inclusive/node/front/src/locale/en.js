export default  {
  lang:'中文',
  // 登录模块
  login:{
    login:"Sign In",
    logining:'Sign In...',
    username:"UserName",
    password:"Password",
    error:'Incorrect username or password',
    logout:'Logout',
    utip:'Phone',
    ctip:'Code',
    ptip:'Password'
  },
  errorpage:{
    '405':'Developing this function,please look forword.',
    '404':''
  },
  // 头部模块
  header:{
    name:'Language',
    lang:'中文',
    title:'Switch Chinese',
    admin:'Administrator',
    back:'Back'
  },
  // 底部模块
  footer:{
    wx0:'WeChat Icon',
    wx1:'WeChat Public Number',
    wx2:'Attention',
    web0:'Ie Icon',
    website:'Offical Website',
    email0:'Email Icon',
    email:'Email'
  },
  // 加载模块
  loading:{
    msg:'Loading...'
  },
  // 提示信息
  tips:{
    success:'Operate succssfully',
    error:'Operate failed',
    info:'Please fill in the relevant information before operation.',
    warning:'Please fill in the contents according to the specifications.'
  },
  //按钮
  button:{
    confirm:'Confirm',
    cancel:'Cancel',
    save:'Save',
    delete:'Delete',
    close:'Close',
    loadingmsg:'Loading...',
    prev:'Prev',
    next:'Next'
  },
  // 竞赛控制台
  race:{
    hour:'H',
    minu:'M',
    second:'S',
    back:'Back to console',
    raceinfo:'Basic information of team',
    name:'Name',
    teamname:'TeamName',
    account:'Account',
    aws:'Account information of AWS',
    racesubmit:'Competition task submission',
    racetip1:'Where you can enter the endpoint of the application.You should enter the IP address or DNS name of the EC2 instance here.',
    racetip2:'Remember, you need to add a protocol "http/https."',
    btnmsg:'Submit',
    racecontitle:'Competition console',
    respacktitle:'Resource package of attack or defense',
    scoretitle:'Score board',
    myself:'Myself',
    // 看分板title
    scorePaneltitles:{
      ranking:'Ranking',
      participant:'Participant',
      // rewardscore:'Reward task score',
      // racescore:'Competition task score',
      service:'Service',
      cost:'Cost'
    },
    tasktitle:'Task board',
    // 竞赛控制台数据
    raceConsoleList:[
      {name:'AWS management console'},
      // {name:'jmeter'},
    ],
    // 攻防资源包列表数据
    packResList:[
      {name:'Electricity market landscape'},
      // {name:'Electricity market attack or defense'}
    ],
    // 得失分看板title
    goalDiffTitles:{
      goaltime:'Time',
      goalscore:'Score',
      goalreson:'Reason',
    },
    racenewtitle:'Event message',
    more:'More',
    // btn msg
    submit:'Submiting...',
    accessCompetition:'Start Game',
    competitionNews:'News of Game',
    playIntro:'The introduce of Gameplay',
    systemNotice:'The announcement of System',
    detail:'Details',
    site:'Site',  
    time:'Time',
    newDetail:'News details',
    noticeDetail:'Notice details',
    raceList:'Race list',
    sponsor:'Sponsor',
    address:'Detailed address'
  },
  game:{
    myteam:'My Team',
    large:{
      rank:'RANK',
      teamName:'Team Name',
      points:'POINTS',
      score:'SCORE',
      service:'Gained points from service',
      cost:'Lost points from cost',
      board:'Points Board'
    },
    title:'Game Console',
    score:'SCORE',
    trend:'TREND',
    ranking:'RANK',
    gameInfo:'Game Information',
    reason:'Score Events',
    scoreBoard:'Scoreboard',
    console:'AWS Console',
    gameName:'Game',
    teamName:'Team Name',
    account:'Account',
    user:'User Name',
    password:'Password',
    countDownBefore:'The rest time to begin game',
    countDownIng:'The rest time to game over',
    stage:'Game Stage',
    task:{
      name:'Game Task',
      desc:'Note',
      desc2:'Task Note',
      submit:'To submit game task',
      resource:'Resource packages of ATTACK or DEFEND',
      detail:'Where you can enter the endpoint of the application.You should enter the IP address or DNS name of the EC2 instance here.Remember, you need to add a protocol "http/https."',
      btnName:'Submit',
      btnNameOver:'Stage Over',
      btnNameNot:'Not Begin',
      time:'Stage Time',
      to:'To'
    },
    resource:{
      defend:'Resource packages of DEFEND',
      attack:'Resource packages of ATTACK'
    },
    reasons:{
      time:'Time',
      score:'Points',
      resource:'Resource',
      reason:'Reason'
    }
  }
}