import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IPost } from './utils';
import { NgForOf, NgIf } from '@angular/common';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'cu-post-list',
  standalone: true,
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgForOf, NgIf, NzInputDirective, FormsModule, NzButtonComponent],
})
export class PostListComponent {
  protected readonly postList: IPost[] = [
    {
      imageUrl: 'assets/posts/mock_picture.jpg',
      title: 'Post Title 1',
      header: 'Header 1',
      description: 'Description here...',
      comments: [
        {
          author: 'testUser1',
          text: 'Cool!!!!',
          profile: 'assets/users/default_logo.png',
        },
        {
          author: 'testUser2',
          text: 'Hate it!!!!',
          profile: 'assets/users/default_logo.png',
        },
        {
          author: 'testUser3',
          text: 'Neutral!!!!',
          profile: 'assets/users/default_logo.png',
        },
      ],
    },
    {
      imageUrl: 'assets/posts/mock_picture_2.jpeg',
      title: 'Post Title 1',
      header: 'Header 1',
      description: 'Description here...',
      comments: [
        {
          author: 'testUser1',
          text: 'Cool!!!!',
          profile: 'assets/users/default_logo.png',
        },
        {
          author: 'testUser2',
          text: 'Hate it!!!!',
          profile: 'assets/users/default_logo.png',
        },
        {
          author: 'testUser3',
          text: 'Neutral!!!!',
          profile: 'assets/users/default_logo.png',
        },
      ],
    },
    {
      imageUrl: 'path_to_image.jpg',
      videoUrl: 'assets/posts/mock_video.mp4',
      title: 'Post Title 1',
      header: 'Header 1',
      description: 'Description here...',
      comments: [
        {
          author: 'testUser1',
          text: 'Cool!!!!',
          profile: 'assets/users/default_logo.png',
        },
        {
          author: 'testUser2',
          text: 'Hate it!!!!',
          profile: 'assets/users/default_logo.png',
        },
        {
          author: 'testUser3',
          text: 'Neutral!!!!',
          profile: 'assets/users/default_logo.png',
        },
      ],
    },
    {
      imageUrl: 'assets/posts/mock_picture.jpg',
      title: 'Post Title 1',
      header: 'Header 1',
      description: 'Description here...',
      comments: [
        {
          author: 'testUser1',
          text: 'Cool!!!!',
          profile: 'assets/users/default_logo.png',
        },
        {
          author: 'testUser2',
          text: 'Hate it!!!!',
          profile: 'assets/users/default_logo.png',
        },
        {
          author: 'testUser3',
          text: 'Neutral!!!!',
          profile: 'assets/users/default_logo.png',
        },
      ],
    },
  ];
}
