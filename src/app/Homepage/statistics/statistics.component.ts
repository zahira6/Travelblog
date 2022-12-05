import { Component, OnInit } from '@angular/core';
import { Chart, Legend } from 'chart.js/auto';
import { M } from 'chart.js/dist/chunks/helpers.core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public chart: any;
  id = this.blogService.getBlogId()
  mostVotes: Number[] = [];
  label: String[] = []

  constructor(public blogService: BlogService) {}

  ngOnInit(): void {
    this.getBlogsWithMostVotes();
    this.createChart()
  }

  getBlogsWithMostVotes(){
    this.blogService.blogs.forEach(blog => {
      this.mostVotes.push(this.blogService.getVotes(blog.id))
      this.label.push(blog.title)
      return this.mostVotes
    })
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'bar',

      data: {
        labels: this.label,
	       datasets: [
          {
            label: "best rated",
            data: this.mostVotes.sort((x, y) => x < y ? 1 : x > y ? -1 : 0),
            backgroundColor: '#14B09B'
          },
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false}
        }}
    });
  }


}
