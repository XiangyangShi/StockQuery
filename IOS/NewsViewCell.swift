//
//  NewsViewCell.swift
//  hwtestSplit
//
//  Created by 史向阳 on 2017/11/28.
//  Copyright © 2017年 史向阳. All rights reserved.
//

import UIKit

class NewsViewCell: UITableViewCell {

    @IBOutlet weak var label1: UILabel!
    @IBOutlet weak var label2: UILabel!
    @IBOutlet weak var label3: UILabel!
    var anchor: String = ""
    override func awakeFromNib() {
        super.awakeFromNib()
        //label1.lineBreakMode = NSLineBreakMode.byWordWrapping
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    func initial( text1:String , text2:String , text3:String , text4: String ){
        self.label1.text = text1
        self.label2.text = text2
        self.label3.text = text3
        self.anchor = text4
    }
    
    func linkoutside(){
        if let url = URL(string: anchor) {
            if #available(iOS 10, *) {
                UIApplication.shared.open(url, options: [:],
                                          completionHandler: {
                                            (success) in
                })
            } else {
                UIApplication.shared.openURL(url)
            }
        }
    }
    
}
