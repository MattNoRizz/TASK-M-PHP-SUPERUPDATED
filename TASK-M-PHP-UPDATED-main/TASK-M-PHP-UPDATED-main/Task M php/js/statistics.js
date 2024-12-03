export class StatisticsController {
    constructor() {
        this.loadStatistics();
        this.initCharts();
    }

    async loadStatistics() {
        try {
            const response = await fetch('/api/statistics.php');
            const stats = await response.json();
            this.updateDashboardStats(stats);
            this.updateCharts(stats);
        } catch (error) {
            console.error('Error loading statistics:', error);
        }
    }

    updateDashboardStats(stats) {
        document.getElementById('totalTasks').textContent = stats.total;
        document.getElementById('completionRate').textContent = 
            `${stats.completion_rate}%`;
    }

    initCharts() {
        // Using Chart.js for visualizations
        this.priorityChart = new Chart(
            document.getElementById('priorityChart'),
            {
                type: 'doughnut',
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        );

        this.trendChart = new Chart(
            document.getElementById('trendChart'),
            {
                type: 'line',
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            }
        );
    }
}
