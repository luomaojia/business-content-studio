import { describe, expect, it } from 'vitest';
import { generateContentPack, serializeTextPack } from './generator';
import type { BusinessProfile, Offer } from './types';

const profile: BusinessProfile = {
  name: '巷口夜宵铺',
  industry: '餐饮/夜宵店',
  city: '杭州',
  tone: '接地气',
  avgPrice: '68',
  signatureItems: '小龙虾、炭烤牛油、冰粉',
};

const offer: Offer = {
  name: '小龙虾双人夜宵套餐',
  price: '99',
  sellingPoints: '现炒入味、虾线处理干净、适合下班聚餐',
  discount: '送冰粉 2 份',
  imagePreviewUrl: '',
};

describe('generateContentPack', () => {
  it('generates seven complete days with local business details', () => {
    const pack = generateContentPack(profile, offer);

    expect(pack.calendar).toHaveLength(7);
    expect(pack.calendar[0]).toMatchObject({
      day: 'Day 1',
      theme: '新品',
    });
    expect(pack.calendar[0].title).toContain('巷口夜宵铺');
    expect(pack.calendar[0].postBody).toContain('小龙虾双人夜宵套餐');
    expect(pack.calendar[0].hashtags.join(' ')).toContain('杭州餐饮/夜宵店');
    expect(pack.reviewReplies.positive).toContain('巷口夜宵铺');
  });

  it('uses fallbacks when optional text is missing', () => {
    const pack = generateContentPack({ ...profile, city: '', avgPrice: '', signatureItems: '' }, { ...offer, price: '', sellingPoints: '' });

    expect(pack.calendar).toHaveLength(7);
    expect(pack.calendar[0].postBody).toContain('本地');
    expect(pack.calendar[0].postBody).toContain('到店咨询');
  });
});

describe('serializeTextPack', () => {
  it('exports the calendar, review replies, and video scripts', () => {
    const pack = generateContentPack(profile, offer);
    const text = serializeTextPack(profile, offer, pack);

    expect(text).toContain('巷口夜宵铺 一周内容包');
    expect(text).toContain('=== 7 天发布日历 ===');
    expect(text).toContain('短视频脚本');
    expect(text).toContain('=== 点评回复模板 ===');
  });
});
