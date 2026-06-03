
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const getMimeType = (base64: string): string => {
  const match = base64.match(/^data:([^;]+);base64,/);
  return match ? match[1] : 'image/png';
};

const cleanBase64 = (base64: string): string => {
  return base64.includes(',') ? base64.split(',')[1] : base64;
};

/**
 * Optimiert den Nutzer-Prompt in Echtzeit für die UI.
 */
export const getQuickRefinement = async (userPrompt: string, style: string) => {
  if (userPrompt.trim().length < 3) return "";
  
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `ACT AS AN ELITE YOUTUBE THUMBNAIL DESIGNER. 
      Optimiere NUR DIE TECHNISCHE BESCHREIBUNG des Prompts: "${userPrompt}" für den Stil "${style}".
      
      STRIKTE REGELN:
      - Erstelle eine Photoshop-Komposition mit extremem Fokus.
      - Nutze technische Fachbegriffe wie Rim Light, Depth of Field, Subsurface Scattering.
      - Antworte NUR mit dem optimierten Prompt-Text.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text?.replace(/^"|"$/g, '') || "";
  } catch (e) {
    return "";
  }
};

/**
 * Analysiert den visuellen Stil eines YouTube-Kanals.
 */
export const analyzeChannelStyle = async (channelName: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Analysiere den visuellen Thumbnail-Stil des YouTube-Kanals "${channelName}". 
      Welche Farben werden genutzt? Wie ist das Layout? Welche Schriftarten oder Texteffekte sind typisch? 
      Wie werden Personen oder Objekte dargestellt?`,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            styleDescription: { type: Type.STRING, description: "Detaillierte Beschreibung des visuellen Stils." },
            colorPalette: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Dominante Farben." },
            layoutPattern: { type: Type.STRING, description: "Typische Anordnung von Elementen." },
            textStyle: { type: Type.STRING, description: "Schriftart- und Texteffekte." }
          },
          required: ["styleDescription", "colorPalette", "layoutPattern", "textStyle"]
        }
      }
    });
    const parsed = JSON.parse(response.text || '{}');
    return parsed;
  } catch (e) {
    throw new Error("Kanal-Stil Analyse fehlgeschlagen.");
  }
};

/**
 * Erstellt eine tiefgreifende Design-Strategie unter Einbeziehung von Markttrends oder Kanal-Referenzen.
 */
const optimizePromptWithMarketResearch = async (userPrompt: string, style: string, useSearch: boolean, channelStyleRef?: any) => {
  const ai = getAI();
  
  let searchSources: any[] = [];
  let promptContext = "";

  if (useSearch) {
    const searchResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Identify high-CTR visual hooks, trending color palettes (e.g. orange/teal), and dominant thumbnail layouts for the niche: "${userPrompt}". 
      Focus on what makes thumbnails viral in 2025.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    promptContext = `MARKET RESEARCH DATA: ${searchResponse.text}`;
    searchSources = searchResponse.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Market Trend Analysis',
      url: chunk.web?.uri || ''
    })).filter((s: any) => s.url) || [];
  }

  const channelContext = channelStyleRef ? `
    CHANNEL STYLE REFERENCE:
    - Overall Style: ${channelStyleRef.styleDescription}
    - Colors: ${channelStyleRef.colorPalette.join(', ')}
    - Layout: ${channelStyleRef.layoutPattern}
    - Text Style: ${channelStyleRef.textStyle}
    ADAPT THIS STYLE FOR THE NEW THUMBNAIL.
  ` : "";

  const systemInstruction = `You are the World's Best YouTube Thumbnail Strategist and Art Director. 
  Your expertise is in high-conversion visual psychology. 
  You understand that a thumbnail must:
  1. Have a clear, singular focus (Subject Dominance).
  2. Use high-contrast color palettes.
  3. Feature exaggerated facial expressions or high-action poses.
  4. Have clean, legible composition even at small mobile sizes.
  5. Use professional lighting (Rim lighting, volumetric fog, cinematic grading).
  
  ${channelContext}

  DO NOT generate generic descriptions. Focus strictly on THUMBNAIL COMPOSITION.
  Respond ONLY in JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Develop an elite high-conversion visual strategy for: "${userPrompt}" in the style of "${style}". 
      Incorporate these research insights: ${promptContext}. 
      Ensure the prompt describes a professional studio photography or elite 3D render look.`,
      config: {
        systemInstruction,
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            optimizedPrompt: { 
              type: Type.STRING, 
              description: "Extremely detailed, technical prompt for image generation, focusing on composition, lighting, and subject." 
            },
            strategy: { 
              type: Type.STRING, 
              description: "The psychological reasoning behind the design choices and how it triggers clicks." 
            },
            colorPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Recommended hex codes or color names for the design."
            }
          },
          required: ["optimizedPrompt", "strategy"]
        }
      }
    });
    const parsed = JSON.parse(response.text || '{}');
    return { ...parsed, sources: searchSources };
  } catch (e) {
    return { 
      optimizedPrompt: `${userPrompt}, professional YouTube thumbnail style, hyper-realistic, subject centered, cinematic lighting, 8k resolution, vibrant textures, strong rim light, blurred background`, 
      strategy: "Optimiert auf Basis von globalen High-Performance Best-Practices für maximale Klickraten.", 
      sources: [] 
    };
  }
};

/**
 * Die finale Bildgenerierung mit optimierten Parametern.
 */
export const generateThumbnail = async (
  prompt: string, 
  style: string, 
  aspectRatio: string = "16:9", 
  useMarketResearch: boolean = false, 
  overlayText: string = "",
  channelStyleRef?: any
) => {
  const ai = getAI();
  
  const { optimizedPrompt, strategy, sources } = await optimizePromptWithMarketResearch(prompt, style, useMarketResearch, channelStyleRef);

  const textDirective = overlayText ? `
    TEXT OVERLAY INSTRUCTIONS: 
    - The image MUST contain the text "${overlayText.toUpperCase()}".
    - Font: Extra-bold, massive, impact-style typography.
    - Style: Glowing, 3D effect, high contrast (e.g., bright yellow text with black outline).
    - Placement: Positioned for maximum visibility without obscuring the main subject's face.
  ` : '';

  const finalInstruction = `
    GOAL: GENERATE AN IRRESISTIBLE HIGH-CTR YOUTUBE THUMBNAIL.
    AESTHETIC: ${style} - Professional Studio Quality.
    
    COMPOSITION RULES:
    - SUBJECT DOMINANCE: The main subject MUST be large, filling 60-75% of the frame.
    - EXTREME FACIAL EXPRESSION: If a person is present, use highly exaggerated emotions.
    - DEPTH OF FIELD: Background must be aesthetically blurred (bokeh) to make the subject pop.
    - RIM LIGHTING: Add a strong, vibrant highlight (rim light) along the subject's edges.
    - SATURATION & CONTRAST: Use high saturation and deep contrast for a 'pop' effect on mobile screens.
    
    TECHNICAL DETAILS:
    - Resolution: 8k, photorealistic, cinematic rendering.
    - Style: Commercial photography, high-end digital art.
    
    ${textDirective}
    
    SCENE DESCRIPTION: ${optimizedPrompt}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: finalInstruction }] },
      config: { 
        imageConfig: { 
          aspectRatio: aspectRatio as any,
          imageSize: "1K"
        } 
      }
    });

    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (imagePart?.inlineData) {
      return {
        url: `data:${imagePart.inlineData.mimeType || 'image/png'};base64,${imagePart.inlineData.data}`,
        optimizedPrompt: strategy,
        sources: sources
      };
    }
    throw new Error("Generierung fehlgeschlagen.");
  } catch (e: any) {
    throw new Error(e.message || "Fehler in der Bildschmiede.");
  }
};

export const remakeThumbnail = async (sourceBase64: string, adjustmentPrompt: string) => {
  const ai = getAI();
  const instruction = `
    PROFESSIONAL THUMBNAIL RETOUCHING: 
    Modify this thumbnail while strictly adhering to elite high-end YouTube aesthetics.
    ENHANCE lighting, dramatically increase contrast, and improve subject focus.
    Apply these specific modifications: "${adjustmentPrompt}".
    Ensure the result looks like a professional YouTuber's thumbnail.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [
          { inlineData: { data: cleanBase64(sourceBase64), mimeType: getMimeType(sourceBase64) } },
          { text: instruction }
        ] 
      },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });

    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (imagePart?.inlineData) {
      return `data:${imagePart.inlineData.mimeType || 'image/png'};base64,${imagePart.inlineData.data}`;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const cloneStyle = async (sourceBase64: string, targetPrompt: string) => {
  const ai = getAI();
  const instruction = `
    THUMBNAIL STYLE CLONE & TRANSFER: 
    Analyze the visual DNA (lighting, color palette, post-processing, and composition) of the reference image.
    Apply that EXACT high-CTR aesthetic to a new thumbnail scene: "${targetPrompt}".
    Ensure the final output retains the professional 'pop' of the original style.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [
          { inlineData: { data: cleanBase64(sourceBase64), mimeType: getMimeType(sourceBase64) } },
          { text: instruction }
        ] 
      },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });

    const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (imagePart?.inlineData) {
      return `data:${imagePart.inlineData.mimeType || 'image/png'};base64,${imagePart.inlineData.data}`;
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const analyzeThumbnailImage = async (base64: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { inlineData: { data: cleanBase64(base64), mimeType: getMimeType(base64) } },
        { text: `Analyse dieses YouTube Thumbnails auf Basis von Klick-Psychologie, Farbtheorie und Komposition. 
        Focus on: Subject dominance, text legibility, emotional trigger, and lighting quality.
        Antworte im JSON Format.` }
      ],
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "CTR score from 0.0 to 10.0" },
            feedback: { type: Type.STRING, description: "Detailed visual analysis feedback." },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Concrete steps to improve CTR." }
          },
          required: ["score", "feedback", "suggestions"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    throw new Error("Analyse fehlgeschlagen.");
  }
};

export const analyzeYoutubeChannel = async (channelUrl: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Führe ein professionelles YouTube Audit für den Kanal "${channelUrl}" durch. 
      Analysiere Branding-Konsistenz, Thumbnail-Psychologie und Marktrelevanz im Vergleich zu Top-Performern der Nische.`,
      config: {
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            channelName: { type: Type.STRING },
            identitySummary: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            actionPlan: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["channelName", "identitySummary", "strengths", "weaknesses", "actionPlan"]
        }
      }
    });
    const parsed = JSON.parse(response.text || '{}');
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Audit Insight Source',
      url: chunk.web?.uri || ''
    })).filter((s: any) => s.url) || [];
    
    return { ...parsed, sources };
  } catch (e) {
    throw new Error("Kanal-Audit fehlgeschlagen.");
  }
};
