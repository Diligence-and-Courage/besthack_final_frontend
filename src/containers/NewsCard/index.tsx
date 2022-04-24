import { Image, Link } from '@fluentui/react';
import React from 'react';

import { GAP } from '../../constants/styles';
import { PlainGreyText, SmallCardHeader } from '../../constants/texts';
import { NewsArticle } from '../../models';
import { StyledRowSpaceBetween } from '../../styled';
import { LabelText, NewsCardWrapper, PlainText } from './styled';

export const NewsCard = ({
  title,
  publishedAt,
  categories = [
    { name: 'политика', id: 'politics' },
    { name: 'экономика', id: 'economics' },
  ],
  description,
  urlToImage,
  source,
  url,
  author,
}: NewsArticle) => {
  const date = new Date(publishedAt);
  const day = date.toLocaleDateString('ru-RU');
  const time = date.toLocaleTimeString('ru-RU').slice(0, 5);
  return (
    <NewsCardWrapper>
      <SmallCardHeader>{title}</SmallCardHeader>
      <StyledRowSpaceBetween>
        <PlainGreyText>{`${day} ${time}`}</PlainGreyText>
        <StyledRowSpaceBetween gap={GAP.m}>
          {categories.map(({ name }, idx) => (
            <LabelText key={idx}>{name}</LabelText>
          ))}
        </StyledRowSpaceBetween>
      </StyledRowSpaceBetween>
      <PlainText>{description}</PlainText>
      <Image
        // imageFit={ImageFit.centerCover}
        src={urlToImage}
        alt={`photo for new: ${title}`}
        // width="100%"
      />
      <StyledRowSpaceBetween>
        <Link href={url}>
          <PlainText>{source.name}</PlainText>
        </Link>
        <PlainGreyText>Автор: {author}</PlainGreyText>
      </StyledRowSpaceBetween>
    </NewsCardWrapper>
  );
};
