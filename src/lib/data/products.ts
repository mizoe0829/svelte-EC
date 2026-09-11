import type { Product } from '../types';

export const PRODUCTS: Product[] = [
	{
		id: 'aurora-headphones',
		name: 'Aurora Sound Pro',
		tagline: '究極の静寂とスタジオ級ハイレゾサウンド',
		description:
			'40mmチタン振動板ドライバーと独自開発のハイブリッドアクティブノイズキャンセリング（ANC）を搭載。航空機グレードのアルミニウムと上質なプロテインレザーにより、長時間のリスニングでも比類なき快適さを実現します。',
		price: 38800,
		originalPrice: 45000,
		category: 'audio',
		badge: 'BESTSELLER',
		rating: 4.9,
		reviewCount: 142,
		images: ['/images/headphones.jpg'],
		colors: [
			{ name: 'Matte Charcoal', hex: '#1e2024' },
			{ name: 'Titanium Silver', hex: '#8a8e94' },
			{ name: 'Midnight Navy', hex: '#162033' }
		],
		inStock: true,
		features: [
			'最大-42dBのアクティブノイズキャンセリング',
			'ハイレゾワイヤレス（LDAC / aptX Adaptive対応）',
			'最大55時間の連続バッテリー駆動',
			'マルチポイント2台同時接続対応',
			'エルゴノミック・プレッシャーフリー設計'
		],
		specs: {
			'ドライバー': '40mm チタンコートダイナミックドライバー',
			'再生周波数帯域': '5Hz - 45,000Hz',
			'Bluetooth': 'Ver 5.4 / Class 1',
			'連続再生時間': '最大55時間（ANC OFF時）/ 42時間（ANC ON時）',
			'重量': '248g'
		}
	},
	{
		id: 'pulse-smartwatch',
		name: 'Pulse X Chrono',
		tagline: 'ミニマリズムと生体モニタリングの極致',
		description:
			'サファイアガラスと高精度セラミックケースで包まれたプレミアムスマートウォッチ。常時表示Retina AMOLEDディスプレイ、心電図・睡眠深度・血中酸素解析センサーを搭載し、洗練されたスタイルと健康管理を両立。',
		price: 49800,
		category: 'wearables',
		badge: 'NEW',
		rating: 4.8,
		reviewCount: 96,
		images: ['/images/smartwatch.jpg'],
		colors: [
			{ name: 'Obsidian Black', hex: '#121316' },
			{ name: 'Slate Gray', hex: '#3f444e' }
		],
		inStock: true,
		features: [
			'1.43インチ 高精細AMOLED常時表示ディスプレイ',
			'心電図（ECG）＆第4世代バイオオプティカルセンサー',
			'50m完全防水（5ATM等級）',
			'フル充電で最大14日間のロングバッテリー',
			'クイック交換可能なフルオロエラストマーストラップ'
		],
		specs: {
			'ケースサイズ': '44mm x 11.2mm',
			'ディスプレイ': '1.43" AMOLED (466x466 px, 1000nits)',
			'防水性能': '5ATM / IP68',
			'バッテリー': '450mAh (最大14日間)',
			'重量': '48g（ストラップ除く）'
		}
	},
	{
		id: 'keyflow-keyboard',
		name: 'Keyflow 75 Custom',
		tagline: '極上のタイピングフィールと洗練のCNCアルミボディ',
		description:
			'6063削り出しアルミニウムケース、ガスケットマウント構造、ファクトリールブ済みのリニアスイッチを標準装備。心地よい打鍵音とタイピング体験が毎日のデスクワークを特別な時間に昇華します。',
		price: 29800,
		originalPrice: 34000,
		category: 'workspace',
		badge: 'SALE',
		rating: 4.95,
		reviewCount: 218,
		images: ['/images/keyboard.jpg'],
		colors: [
			{ name: 'Dark Slate & Amber', hex: '#262930' },
			{ name: 'Anodized Silver', hex: '#9da3ad' }
		],
		inStock: true,
		features: [
			'フルCNC削り出しアルミニウム削り出しユニボディ',
			'多層ポロンフォーム＆ガスケットマウント設計',
			'高耐久PBTダブルショットキーキャップ',
			'2.4GHz超低遅延ワイヤレス / Bluetooth / 有線Type-C対応',
			'マルチメディアコントロール対応ロータリーノブ'
		],
		specs: {
			'レイアウト': '75% コンパクト配列 (82キー)',
			'スイッチ': 'LUMEN Custom Pre-Lubed Linear (45g動作圧)',
			'接続': '2.4GHz / Bluetooth 5.3 / USB-C',
			'バッテリー容量': '4,000mAh (バックライト消灯で最大200時間)',
			'重量': '1,420g'
		}
	},
	{
		id: 'aether-desk-lamp',
		name: 'Aether Bar Light',
		tagline: '目に優しく、空間を研ぎ澄ます建築的デスクライト',
		description:
			'無駄を削ぎ落としたミニマルな幾何学デザイン。自然光に近い高演色性LED（CRI Ra98）を採用し、眼精疲労を軽減。静電容量式タッチスライダーで無段階の色温度・調光コントロールが可能です。',
		price: 21500,
		category: 'workspace',
		rating: 4.7,
		reviewCount: 78,
		images: ['/images/lamp.jpg'],
		colors: [
			{ name: 'Matte Deep Black', hex: '#18191c' },
			{ name: 'Space Gray', hex: '#4a4d54' }
		],
		inStock: true,
		features: [
			'太陽光同等の超高演色性LED（Ra98以上）',
			'2700K〜6500Kの無段階調色＆調光スライダー',
			'デュアルジョイントアームで自由自在な照射角度調整',
			'周囲の明るさに応じて最適化する自動調光センサー内蔵',
			'USB-C給電ポート付きベーススタンド'
		],
		specs: {
			'照度': '最大 1,800 Lux (直下40cm)',
			'色温度': '2700K - 6500K',
			'消費電力': '12W',
			'材質': '航空機アルミニウム合金, ABS',
			'重量': '1,150g'
		}
	},
	{
		id: 'soundsphere-speaker',
		name: 'SoundSphere Acoustic',
		tagline: '360°全方位に響き渡るルームフィリング・ハイファイ',
		description:
			'円筒形アコースティックキャビネットと特殊テキスタイルメッシュから放たれる圧倒的な音場。デュアルパッシブラジエーターとDSPプロセッサにより、コンパクトながら芯のある重低音とクリアな中高域を届けます。',
		price: 24800,
		originalPrice: 28000,
		category: 'audio',
		badge: 'SALE',
		rating: 4.85,
		reviewCount: 110,
		images: ['/images/speaker.jpg'],
		colors: [
			{ name: 'Graphite Mesh', hex: '#23252a' },
			{ name: 'Sandstone Grey', hex: '#6b6f76' }
		],
		inStock: true,
		features: [
			'デュアルドライバー＆360度ルーム音響システム',
			'IP67防塵・完全防水（お風呂やアウトドアでも安心）',
			'LEDアンビエントリングによる音量・ステータス表示',
			'最長24時間の連続ワイヤレス再生',
			'2台ステレオペアリング（True Wireless Stereo）対応'
		],
		specs: {
			'最大出力': '35W (RMS)',
			'周波数特性': '55Hz - 22,000Hz',
			'防水防塵': 'IP67',
			'連続再生': '24時間 (中音量時)',
			'重量': '680g'
		}
	},
	{
		id: 'aurora-studio-edition',
		name: 'Aurora Studio Master',
		tagline: 'プロフェッショナルのための開放型リファレンス',
		description:
			'ハイエンドオーディオ愛好家とクリエイターのためにチューニングされたオープンバック・モニター。驚異的な音抜けと微細な音源のニュアンスを完全に再現します。',
		price: 58000,
		category: 'audio',
		badge: 'NEW',
		rating: 4.98,
		reviewCount: 52,
		images: ['/images/headphones.jpg'],
		colors: [
			{ name: 'Titanium Gunmetal', hex: '#33373d' },
			{ name: 'Deep Bronze', hex: '#4a3f35' }
		],
		inStock: true,
		features: [
			'オープンバック（開放型）アコースティック構造',
			'50mm ネオジム磁石マグネシウム合金振動板',
			'ベロア＆形状記憶低反発イヤーパッド',
			'着脱式高純度無酸素銅（OFC）バランスケーブル付属',
			'ドイツ製高精度音響ダンパー'
		],
		specs: {
			'形式': '開放型ダイナミック',
			'インピーダンス': '64Ω',
			'再生周波数帯域': '4Hz - 52,000Hz',
			'ケーブル長': '2.0m 着脱式 (4.4mmバランス / 3.5mmプラグ変換付き)',
			'重量': '270g'
		}
	},
	{
		id: 'pulse-band-active',
		name: 'Pulse Active Tracker',
		tagline: '羽のように軽く、睡眠と運動を24時間シームレス解析',
		description:
			'わずか24gの超軽量スマートトラッカー。装着していることを忘れる快適性で、睡眠時無呼吸リスク検知、ストレスレベル測定、100種類以上のワークアウトを自動トラッキング。',
		price: 18500,
		category: 'wearables',
		rating: 4.65,
		reviewCount: 63,
		images: ['/images/smartwatch.jpg'],
		colors: [
			{ name: 'Stealth Black', hex: '#191b1f' },
			{ name: 'Frost White', hex: '#d2d6dc' }
		],
		inStock: true,
		features: [
			'重さわずか24gの超軽量・スリムプロファイル',
			'SpO2常時モニタリング＆睡眠ステージ詳細解析',
			'急速充電対応（15分の充電で3日間使用可能）',
			'NFCタッチ決済対応',
			'50m防水対応'
		],
		specs: {
			'ディスプレイ': '1.1" AMOLED',
			'バッテリー持続時間': '通常使用で最大10日間',
			'センサー': '6軸加速度計, 光学式脈拍センサー, 皮膚温度センサー',
			'重量': '24g'
		}
	},
	{
		id: 'keyflow-desk-mat',
		name: 'Keyflow Felt Desk Pad',
		tagline: '上質なウールフェルトがもたらす極上のデスク体験',
		description:
			'天然メリノウールフェルトと滑り止めコルク裏地を組み合わせたプレミアムデスクマット。適度なクッション性でタイピング音を和らげ、マウスのスムーズな滑りを約束します。',
		price: 6800,
		category: 'lifestyle',
		rating: 4.75,
		reviewCount: 88,
		images: ['/images/keyboard.jpg'],
		colors: [
			{ name: 'Dark Charcoal Felt', hex: '#2b2c30' },
			{ name: 'Heather Grey', hex: '#636770' }
		],
		inStock: true,
		features: [
			'プレミアム天然メリノウールフェルト採用',
			'底面は環境に優しい天然ポルトガル産コルクシート',
			'キーボードの底打ち振動を吸収し静音化',
			'精密レーザーカットエッジでほつれを防止',
			'90cm x 40cmのゆとりあるワイドサイズ'
		],
		specs: {
			'サイズ': '900mm x 400mm x 4mm',
			'素材': '80% メリノウール / 20% 高密度ポリエステル, 天然コルク',
			'お手入れ': 'スポットクリーニング / 撥水加工済み',
			'重量': '380g'
		}
	}
];

export const CATEGORIES = [
	{ id: 'all', label: 'All Products', icon: '✦' },
	{ id: 'audio', label: 'Audio & Sound', icon: '🎧' },
	{ id: 'workspace', label: 'Workspace & Desk', icon: '⌨️' },
	{ id: 'wearables', label: 'Wearables & Health', icon: '⌚' },
	{ id: 'lifestyle', label: 'Lifestyle & Care', icon: '✨' }
] as const;

export const DISCOUNT_CODES: Record<string, { rate: number; label: string }> = {
	'LUMEN10': { rate: 0.1, label: 'オープン記念10% OFF' },
	'WELCOME': { rate: 0.15, label: '初回購入15% OFF' },
	'SPECIAL20': { rate: 0.2, label: 'VIPシークレット20% OFF' }
};

export const FREE_SHIPPING_THRESHOLD = 15000;
export const STANDARD_SHIPPING_FEE = 750;
