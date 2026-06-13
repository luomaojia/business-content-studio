import type { BusinessProfile, GeneratedPack, LlmSettings, Offer } from './types';

export type LlmGenerationResult = {
  pack: GeneratedPack;
};

export async function generateWithLlm(
  profile: BusinessProfile,
  offer: Offer,
  settings: LlmSettings,
): Promise<LlmGenerationResult> {
  const response = await fetch('/api/generate-content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ profile, offer, settings }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error || `LLM 生成失败：${response.status}`);
  }

  return payload as LlmGenerationResult;
}
