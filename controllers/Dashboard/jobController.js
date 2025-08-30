const slugify = require('slugify');
const jobModel = require('../../models/jobModel');

module.exports.addJob = async (req, res) => {
    // console.log('call');
    // console.log(req);
    
    const {adminId, adminName} = req;

    const { jobName, jobBody } = req.body;

    /*
    const jobObj = {
        jobName: req.body.jobName,
        jobSlug: slugify(req.body.jobName),
        jobBody: req.body.jobBody,
        adminId,
        adminName
    }
    */

    const error = {};

    //  console.log(req.body);
    
    if (!jobName) {
        error.jobName = 'Please provide job name';
    }
    if (!jobBody) {
        error.jobBody = 'Please provide job description';
    }

    if (Object.keys(error).length == 0) {
        /*
        const job = new jobModel(jobObj);
        jobList = await job.save();
        res.status(201).json({
            jobs: jobList,
            successMessage: 'Job add successfull'
        })
        */

        const jobSlug = jobName.trim().split(' ').join('-');
        try {
            const checkJob = await jobModel.findOne({ jobSlug });
            if(checkJob){
                res.status(404).json({
                    errorMessage: {
                        error: 'Already added job'
                    }
                })
            } else {
                await jobModel.create({
                    jobName: jobName.trim(),
                    jobSlug,
                    jobBody,
                    adminId,
                    adminName
                })
                res.status(201).json({
                    successMessage: 'Job add successfull'
                })
            }
        } catch (error) {
            res.status(500).json({
                errorMessage: {
                    error: 'Internal server error'
                }
            })
        }

        /*
        await jobModel.create({
            jobName: jobName.trim(),
            jobSlug: slugify(req.body.jobName),
            jobBody,
            adminId,
            adminName
        })
        res.status(201).json({
            successMessage: 'Job add successfull'
        })
        */

    } else {
        res.status(404).json({ errorMessage: error });
    }

    

}

module.exports.getJobs = async (req, res) => {
    // console.log('res');
    try {
        const allJob = await jobModel.find({});
        res.status(200).json({
            allJob
        });
    } catch (error) {
        res.status(500).json({
            errorMessage: {
                error: 'Internal server error'
            }
        }); 
    }
}

