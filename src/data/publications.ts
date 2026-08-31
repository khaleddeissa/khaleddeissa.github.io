export interface Publication {
  title: string;
  venue: string;
  date: string;
  doi: string;
  url: string;
  abstract: string;
}

export const publications: Publication[] = [
  {
    title: 'Fake vs. Real Face Discrimination Using Convolutional Neural Networks',
    venue:
      'Published as Chapter 10 in Pan-African Conference on Artificial Intelligence, Vol. 2, Springer (PanAfriCon AI 2023)',
    date: 'April 2024',
    doi: '10.1007/978-3-031-57639-3_10',
    url: 'https://link.springer.com/chapter/10.1007/978-3-031-57639-3_10',
    abstract:
      'The rapid advancements in image manipulation technology and the proliferation of Generative Adversarial Network (GAN) generated content have created a pressing need for effective methods to distinguish between fake and real imagery. Convolutional Neural Networks (CNNs) have exhibited exceptional performance in image recognition tasks, making them an ideal choice for addressing the challenge of fake vs. real face discrimination. This paper proposes three new CNN models specifically designed for discriminating between fake and real facial images, comparing them against several state-of-the-art pre-trained models such as Inception-ResNet-V2. An extensive dataset of real and fake face images enables thorough inspection across Accuracy, Precision, Recall, F1-score, AUC-ROC, ROC, and Confusion Matrix. The results demonstrate that Model 3 achieves highly promising performance, outperforming pre-trained models in testing results, discrimination ability on new data, and training/validation performance — with implications for forensic analysis and social media content moderation.',
  },
];
