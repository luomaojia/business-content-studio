import type { Industry, IndustryPreset } from './types';

export const industryPresets: Record<Industry, IndustryPreset> = {
  '餐饮/夜宵店': {
    industry: '餐饮/夜宵店',
    exampleName: '巷口夜宵铺',
    avgPrice: '68',
    signatureItems: '炭烤牛油、小龙虾、蒜蓉生蚝、冰粉',
    offer: {
      name: '小龙虾双人夜宵套餐',
      price: '99',
      sellingPoints: '现炒入味、虾线处理干净、适合下班聚餐、出餐快',
      discount: '到店报暗号“今晚开吃”送冰粉 2 份',
    },
  },
  美甲店: {
    industry: '美甲店',
    exampleName: '微光美甲工作室',
    avgPrice: '128',
    signatureItems: '纯色美甲、猫眼款、手部护理、通勤款',
    offer: {
      name: '通勤显白猫眼款',
      price: '129',
      sellingPoints: '显手白、不挑肤色、可保持 3-4 周、适合上班通勤',
      discount: '两人同行每人减 20',
    },
  },
  咖啡店: {
    industry: '咖啡店',
    exampleName: '街角慢咖啡',
    avgPrice: '32',
    signatureItems: '拿铁、冷萃、巴斯克蛋糕、手冲',
    offer: {
      name: '午后拿铁蛋糕套餐',
      price: '45',
      sellingPoints: '适合办公休息、甜度低、出片座位多、近地铁',
      discount: '工作日下午 2-5 点第二杯半价',
    },
  },
  宠物店: {
    industry: '宠物店',
    exampleName: '毛孩子护理社',
    avgPrice: '158',
    signatureItems: '洗护、修毛、驱虫、宠物零食',
    offer: {
      name: '小型犬精致洗护',
      price: '139',
      sellingPoints: '温和洗护、吹干彻底、可拍护理前后对比、预约制不排队',
      discount: '新客首次到店送爪爪护理',
    },
  },
  健身房: {
    industry: '健身房',
    exampleName: '燃点健身私教馆',
    avgPrice: '199',
    signatureItems: '私教体验课、体测、减脂训练、力量训练',
    offer: {
      name: '一对一体测体验课',
      price: '49',
      sellingPoints: '测体态、给训练建议、适合新手、无需办卡',
      discount: '本周预约送 7 天训练打卡表',
    },
  },
};
