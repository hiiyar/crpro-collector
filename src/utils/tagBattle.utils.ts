class Utils{
    generateTag(tag1:string, tag2:string, battleTime: string){
      
      const tag = [tag1.replace("#",""),tag2.replace("#","")];
      tag.sort()
      tag.push(battleTime)
      return tag.join("")
    }
}

export const tagBattleUtils = new Utils();